async (page) => {
  const results = [];
  const errors = [];
  const requests = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  page.on('request', r => requests.push({url:r.url(),method:r.method(),body:r.postData()}));
  const check = (condition, label, detail) => { results.push({label,passed:!!condition,detail}); if(!condition) throw new Error(label+': '+JSON.stringify(detail)); };
  const open = async () => { await page.getByRole('button',{name:/Vincular (otro )?padre/}).click(); await page.locator('dialog[open]').waitFor(); };
  const close = async () => { await page.keyboard.press('Escape'); await page.locator('dialog').waitFor({state:'detached'}); };
  const defaults = async () => await page.locator('dialog').evaluate(d => ({name:d.querySelector('[name=name]').value,email:d.querySelector('[name=email]').value,selected:[...d.querySelectorAll(':checked')].map(e=>e.value),focus:document.activeElement.id}));
  const submit = async (name,email,enter=false) => { await page.locator('#parent-name').fill(name); await page.locator('#parent-email').fill(email); if(enter) await page.locator('#parent-email').press('Enter'); else await page.getByRole('button',{name:'Enviar invitación'}).click(); };
  try {
    await page.setViewportSize({width:1440,height:900});
    const children=[['mateo-fernandez','Mateo Fernández'],['sofia-mendez','Sofía Méndez'],['benjamin-ruiz','Benjamín Ruiz'],['valentina-soto','Valentina Soto'],['tomas-diaz','Tomás Díaz'],['emma-castro','Emma Castro'],['lucas-romero','Lucas Romero'],['olivia-vega','Olivia Vega']];
    for(const [id,name] of children){
      await page.goto('http://localhost:3105/nino/'+id); await page.waitForURL('**/nino/'+id); await page.getByRole('heading',{name,exact:true}).waitFor(); await page.evaluate(()=>document.fonts.ready);
      const url=page.url(); await open(); const text=await page.locator('dialog').innerText();
      check(page.url()===url && text.includes('a '+name) && text.includes('feed de '+name.split(' ')[0]),'C1-2 '+id);
      check(JSON.stringify((await defaults()).selected)==='["Mamá"]' && (await defaults()).name==='' && (await defaults()).email==='', 'C3 defaults '+id);
      await close();
    }
    await page.goto('http://localhost:3105/nino/mateo-fernandez'); await page.waitForURL('**/mateo-fernandez');
    const section=page.getByRole('region',{name:'Padres vinculados'});
    const original=await section.innerText();
    await open();
    for(const relation of ['Papá','Tutor/a','Mamá']){ await page.locator('dialog label').filter({has:page.getByRole('radio',{name:relation,exact:true})}).click(); check(JSON.stringify((await defaults()).selected)===JSON.stringify([relation]),'C4 '+relation); }
    await submit('','');
    check(await page.locator('dialog[open]').count()===1 && await page.locator('#parent-name').getAttribute('aria-invalid')==='true' && (await defaults()).focus==='parent-name','C5-6 empty');
    check(await page.locator('#parent-name').getAttribute('aria-describedby')==='parent-name-error' && await page.locator('#parent-email').getAttribute('aria-describedby')==='parent-email-error','C6 accessible association');
    await submit('   ','not-an-email',true); check((await defaults()).focus==='parent-name','C5 spaces and invalid email');
    await submit('Familiar Ficticio','not-an-email',true); check((await defaults()).focus==='parent-email' && await page.locator('#parent-email').getAttribute('aria-invalid')==='true','C5-7 invalid Enter email');
    await page.getByText('Tutor/a',{exact:true}).click();
    await submit('  Familiar Verificador  ','  Verifier@example.test  ');
    await page.locator('dialog').waitFor({state:'detached'});
    check(await section.getByText('Familiar Verificador',{exact:true}).count()===1 && (await section.innerText()).includes('Tutor/a · invitación enviada'),'C7-9 valid button normalized name');
    check((await section.innerText()).includes('Lucía Fernández')&&(await section.innerText()).includes('Diego Fernández'),'C11 originals intact');
    await open(); await submit('Duplicado Ficticio','VERIFIER@EXAMPLE.TEST',true);
    check(await page.locator('dialog[open]').count()===1 && (await page.locator('#parent-email-error').innerText()).includes('Ya hay una invitación') && (await defaults()).focus==='parent-email','C9 duplicate case insensitive trimmed email'); await close();
    await open(); await submit('Segundo Verificador','second@example.test',true); await page.locator('dialog').waitFor({state:'detached'});
    check(await section.getByText('Segundo Verificador',{exact:true}).count()===1 && await section.getByText('Familiar Verificador',{exact:true}).count()===1,'C7-8 valid Enter exactly once');
    await page.getByRole('link',{name:'Volver a Niños'}).click(); await page.waitForURL('**/ninos');
    await page.locator('a[href="/nino/sofia-mendez"]').click(); await page.waitForURL('**/sofia-mendez'); await page.getByRole('heading',{name:'Sofía Méndez',exact:true}).waitFor();
    check(await page.getByText('Familiar Verificador',{exact:true}).filter({visible:true}).count()===0,'C8 no invitation leaks');
    await open(); await submit('Familiar Sofia Ficticio','verifier@example.test',true); await page.locator('dialog').waitFor({state:'detached'}); check(await page.getByText('Familiar Sofia Ficticio',{exact:true}).filter({visible:true}).count()===1,'C10 same email different child');
    await page.getByRole('link',{name:'Feed',exact:true}).click(); await page.waitForURL('http://localhost:3105/');
    await page.getByRole('link',{name:'Niños',exact:true}).click(); await page.waitForURL('**/ninos'); await page.locator('a[href="/nino/mateo-fernandez"]').click(); await page.waitForURL('**/mateo-fernandez'); await page.getByRole('heading',{name:'Mateo Fernández',exact:true}).waitFor();
    check(await page.getByText('Familiar Verificador',{exact:true}).filter({visible:true}).count()===1 && await page.getByText('Segundo Verificador',{exact:true}).filter({visible:true}).count()===1,'C12 navigation persistence');
    const other=await page.context().newPage(); await other.goto(page.url()); check(await other.getByText('Familiar Verificador',{exact:true}).count()===0,'scope new tab empty'); await other.close();
    for(const method of ['X','Escape','outside']){
      await open(); await page.locator('#parent-name').fill('Descartado Ficticio'); await page.getByText('Papá',{exact:true}).click();
      if(method==='X') await page.getByRole('button',{name:'Cerrar vinculación de padre'}).click(); else if(method==='Escape') await page.keyboard.press('Escape'); else await page.mouse.click(300,850);
      await page.locator('dialog').waitFor({state:'detached'});
      check(await page.getByRole('button',{name:/Vincular otro padre/}).evaluate(e=>e===document.activeElement),'C16 restore focus '+method);
      await open(); const state=await defaults(); check(state.name===''&&state.email===''&&state.selected[0]==='Mamá','C14-15 discard '+method); await close();
    }
    await open();
    for(let i=0;i<18;i++){ await page.keyboard.press(i%2?'Shift+Tab':'Tab'); check(await page.locator('dialog').evaluate(d=>d.contains(document.activeElement)),'C16 focus trapped '+i); }
    const scroll=await page.evaluate(()=>({window:scrollY,main:[...document.querySelectorAll('main')].find(e=>e.checkVisibility()).scrollTop}));
    await page.mouse.move(1200,700); await page.mouse.wheel(0,600);
    check(await page.evaluate(()=>[document.documentElement,document.body,[...document.querySelectorAll('main')].find(e=>e.checkVisibility())].every(e=>getComputedStyle(e).overflow==='hidden')),'C17 background locked');
    check(JSON.stringify(scroll)===JSON.stringify(await page.evaluate(()=>({window:scrollY,main:[...document.querySelectorAll('main')].find(e=>e.checkVisibility()).scrollTop}))),'C17 background wheel does not scroll');
    const url=page.url(); await page.mouse.click(120,230); check(page.url()===url,'C17 background click cannot navigate');
    if(await page.locator('dialog').count()) await close();
    await page.reload(); await page.waitForURL('**/mateo-fernandez'); await section.waitFor();
    check((await section.innerText())===original,'C11-13 reload removes only new invitations');
    await open(); const text=await page.locator('dialog').innerText(); check(text.includes('7K4P9')&&text.includes('Vence en 7 días')&&text.includes('Demostración: no se enviarán correos ni se activarán cuentas'),'C18 illustrative code notice');
    check(await page.evaluate(()=>localStorage.length===0&&sessionStorage.length===0&&document.cookie===''),'C19 no storage');
    check(!requests.some(r=>r.method!=='GET'&&r.method!=='HEAD')&&!requests.some(r=>JSON.stringify(r).toLowerCase().includes('verifier@example.test')),'C19 no data transmission');
    check(errors.length===0,'C24 runtime console',errors);
    await close();
    return {results,errors,requestCount:requests.length,writeRequests:requests.filter(r=>r.method!=='GET'&&r.method!=='HEAD')};
  } catch(error) { return {failure:String(error),results,errors,requestCount:requests.length}; }
}


