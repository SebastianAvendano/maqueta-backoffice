"use strict";(self.webpackChunkbackoffice=self.webpackChunkbackoffice||[]).push([[163],{4163:(R,f,t)=>{t.r(f),t.d(f,{LoginPageModule:()=>J});var y=t(9808),i=t(2382),u=t(1402),v=t(5861),o=t(5e3),C=t(2323),T=t(9004),A=t(547),P=t(1995),h=t(4526),p=t(7484),l=t(4546),z=t(1894),d=t(1047),M=t(2683),Z=t(6042),F=t(2643);const x=[{path:"",component:(()=>{class r{constructor(n,s,m,a,c,g){this.fb=n,this.auth=s,this.userService=m,this.navCtrl=a,this.firestore=c,this.notification=g,this.message="",this.isLoading=!1,this.loginForm=this.fb.group({remember:[!0],email:[null,[i.kI.required,i.kI.email]],password:[null,[i.kI.required,i.kI.minLength(6)]]})}login(){var n=this;return(0,v.Z)(function*(){if(n.loginForm.valid){n.isLoading=!0;const s=n.loginForm.value.email,m=n.loginForm.value.password;yield n.auth.login(s,m).then(a=>{(null==a?void 0:a.user)&&n.firestore.collection("admins").doc(a.user.uid).get().subscribe(function(){var c=(0,v.Z)(function*(g){if(g.exists){const L=g.data(),O=L.rol.id,B=(yield n.userService.getRolByKey("admin")).docs[0].ref.id,Y=L.isActive;B===O?Y?(n.auth.session(!0),n.navCtrl.Push("dashboard")):(n.message="usuario inactivo",n.logout(n.message)):(n.message="Usuario o contrase\xf1a incorrectos",n.logout(n.message))}else n.message="Usuario o contrase\xf1a incorrectos",n.logout(n.message)});return function(g){return c.apply(this,arguments)}}())}).catch(()=>{n.message="Usuario o contrase\xf1a incorrectos",n.logout(n.message)})}else Object.values(n.loginForm.controls).forEach(s=>{s.invalid&&(s.markAsDirty(),s.updateValueAndValidity({onlySelf:!0}),n.message="Los datos ingresados son invalidos",n.notification.showMessage(n.message))})})()}logout(n){this.auth.session(!1),this.loginForm.reset(),this.auth.logout(),this.isLoading=!1,this.notification.showMessage(n)}}return r.\u0275fac=function(n){return new(n||r)(o.Y36(i.qu),o.Y36(C.e),o.Y36(T.K),o.Y36(A.c),o.Y36(P.ST),o.Y36(h.g))},r.\u0275cmp=o.Xpm({type:r,selectors:[["app-login"]],decls:16,vars:4,consts:[[1,"container"],["nzTitle","Ingresar",1,"card-login",3,"nzBordered"],["nz-form","",1,"login-form",3,"formGroup","ngSubmit"],["nzErrorTip","Ingresa un correo valido"],["nzPrefixIcon","user"],["type","text","nz-input","","formControlName","email","placeholder","Correo"],["nzErrorTip","Contrase\xf1a invalida"],["nzPrefixIcon","lock"],["type","password","nz-input","","formControlName","password","placeholder","Contrase\xf1a"],["nz-button","",1,"login-form-button","login-form-margin",3,"nzType","nzLoading"],["nz-row","",1,"login-form-margin"],["routerLink","/forgot-password",1,"forgot-password"]],template:function(n,s){1&n&&(o.TgZ(0,"div",0),o.TgZ(1,"nz-card",1),o.TgZ(2,"form",2),o.NdJ("ngSubmit",function(){return s.login()}),o.TgZ(3,"nz-form-item"),o.TgZ(4,"nz-form-control",3),o.TgZ(5,"nz-input-group",4),o._UZ(6,"input",5),o.qZA(),o.qZA(),o.qZA(),o.TgZ(7,"nz-form-item"),o.TgZ(8,"nz-form-control",6),o.TgZ(9,"nz-input-group",7),o._UZ(10,"input",8),o.qZA(),o.qZA(),o.qZA(),o.TgZ(11,"button",9),o._uU(12,"Ingresar"),o.qZA(),o.TgZ(13,"div",10),o.TgZ(14,"a",11),o._uU(15,"Olvide mi contrase\xf1a"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&n&&(o.xp6(1),o.Q6J("nzBordered",!1),o.xp6(1),o.Q6J("formGroup",s.loginForm),o.xp6(9),o.Q6J("nzType","primary")("nzLoading",s.isLoading))},directives:[p.bd,i._Y,i.JL,l.Lr,i.sg,z.SK,l.Nx,z.t3,l.Fd,d.gB,M.w,d.Zp,i.Fj,i.JJ,i.u,Z.ix,F.dQ,u.yS],styles:[".container[_ngcontent-%COMP%]{background:#f5f5f5;padding:30px;height:100%;display:flex;align-items:center}.card-login[_ngcontent-%COMP%]{margin:auto;width:22%}.login-form[_ngcontent-%COMP%]{max-width:100%}.login-form-margin[_ngcontent-%COMP%]{align-items:center;margin-bottom:2%}.forgot-password[_ngcontent-%COMP%]{margin:auto}.login-form-forgot[_ngcontent-%COMP%]{float:right}.login-form-button[_ngcontent-%COMP%]{width:100%}"]}),r})()}];let U=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({imports:[[u.Bz.forChild(x)],u.Bz]}),r})();var I=t(6114),S=t(9727);let J=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({providers:[h.g],imports:[[U,y.ez,i.u5,i.UX,l.U5,d.o7,Z.sL,p.vh,I.Wr,S.gR]]}),r})()}}]);