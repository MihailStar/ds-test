window.addEventListener("load",(()=>{const e=document.querySelector(".ask-question-page__form form"),t=Array.from(e.querySelectorAll("input")),o=e.querySelector('button[type="submit"]');e.setAttribute("novalidate","novalidate"),e.addEventListener("submit",(r=>{r.preventDefault();const n=[];if(t.forEach((e=>{var t;const o=e.nextElementSibling;if(e.checkValidity())return void(null!==o&&o.remove());if(null!==o)return void n.push(e);const r=document.createElement("p");r.className="form__message form__message_about-error",r.textContent=null!==(t=e.dataset.errorMessage)&&void 0!==t?t:"Заполните это поле",e.after(r),n.push(e)})),void 0!==n[0])return void n[0].focus();const s=document.createElement("p");s.className="form__message",s.hidden=!0,e.append(s),null!==o&&(o.disabled=!0),fetch(e.action,{method:"POST",body:new FormData(e)}).then((e=>{if(201!==e.status)throw new Error("Что-то пошло не так. Попробуйте позднее");return e})).then((e=>e.json())).then((e=>{var t,o;if(!0!==e.status)throw new Error(null!==(o=e.text)&&void 0!==o?o:e);s.classList.add("form__message_about-success"),s.textContent=null!==(t=e.text)&&void 0!==t?t:e,s.hidden=!1})).catch((e=>{var t;s.classList.add("form__message_about-error"),s.textContent=null!==(t=e.message)&&void 0!==t?t:e,s.hidden=!1})).finally((()=>{null!==o&&setTimeout((()=>{o.disabled=!1}),3e3),setTimeout((()=>{s.remove(),e.reset()}),3e3)}))}))}));