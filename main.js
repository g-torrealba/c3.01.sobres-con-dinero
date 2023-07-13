/* 
=================
Sobres con Dinero
=================
Se tienen N sobres con dinero, cada uno con billetes del mismo valor. 
De cada sobre se conoce el código, valor del billete y la cantidad. Se requiere
determinar el total de dinero:
 a- En cada sobre,
 b- Entre todos los sobres.

código valorBillete cantidad subTotal() (R.a)
  1       10            5       50
  2       20            2       40
  3       100           4       400
  4       50            3       150

  R.b) El total de dinero en todos los sobres es de $640
*/

class Cl_sobre {
   constructor(codigo = null, valorBillete = 0, cantidad = 0) {
      this.codigo = codigo;
      this.valorBillete = valorBillete;
      this.cantidad = cantidad;
   }
   set codigo(c) {
      this._codigo = +c;
   }
   get codigo() {
      return this._codigo;
   }
   set valorBillete(v) {
      this._valorBillete = +v;
   }
   get valorBillete() {
      return this._valorBillete;
   }
   set cantidad(c) {
      this._cantidad = +c;
   }
   get cantidad() {
      return this._cantidad;
   }
   subTotal() {
      return this.valorBillete * this.cantidad;
   }
}

class Cl_sobres {
   constructor() {
      this.arrSobres = [];
   }

   agregar(sobre) {
      this.arrSobres.push(sobre);
   }

   eliminar(codigo) {
      for (let pos = 0; pos < this.arrSobres.length; pos++) {
         if (this.arrSobres[pos].codigo === codigo) {
            this.arrSobres.splice(pos, 1);
            pos--;
         }
      }
   }
   existe(codigo) {
      let existe = false;
      this.arrSobres.forEach((sobre) => {
         if (sobre.codigo === codigo) existe = true;
      });
      return existe;
   }

   totalDinero() {
      let totalDinero = 0;
      this.arrSobres.forEach((sobre) => {
         totalDinero += sobre.subTotal();
      });
      return totalDinero;
   }
}

class Cl_vista {
   constructor(app) {
      this.app = app;
   }
}

class Cl_vSobre extends Cl_vista {
   agregar() {
      let sobre = new Cl_sobre();
      sobre.codigo = prompt("Código del sobre:");
      sobre.valorBillete = prompt("Valor del billete:");
      sobre.cantidad = prompt("Cantidad de billetes:");
      this.app.mSobres.agregar(sobre);
   }
   eliminar() {
      let codigo = +prompt("Código del sobre a eliminar:");
      if (this.app.mSobres.existe(codigo)) {
         if (confirm(`¿Seguro de eliminar el sobre ${codigo}?`))
            this.app.mSobres.eliminar(codigo);
      } else alert(`No existe el sobre con código ${codigo}`);
   }
}

class Cl_vSobres extends Cl_vista {
   constructor(app) {
      super(app);
      this.btAgregar = document.getElementById("vSobres_btAgregar");
      this.btEliminar = document.getElementById("vSobres_btEliminar");
      this.btAgregar.onclick = () => {
         this.app.vSobre.agregar();
         this.listarInfo();
      };
      this.btEliminar.onclick = () => {
         this.app.vSobre.eliminar();
         this.listarInfo();
      };
      this.rptrSobres = document.getElementById("vSobres_rptrSobres");
      this.tmpltDivSobre = this.rptrSobres.children[0].cloneNode(true);
      this.lblTotalDinero = document.getElementById("vSobres_lblTotalDinero");
   }

   listarInfo() {
      while (this.rptrSobres.children[0] !== undefined) {
         this.rptrSobres.children[0].remove();
      }
      this.app.mSobres.arrSobres.forEach((sobre) => {
         let htmlSobre = this.tmpltDivSobre.cloneNode(true);
         htmlSobre.getElementsByClassName("vSobres_codigo")[0].innerHTML =
            sobre.codigo;
         htmlSobre.getElementsByClassName("vSobres_valorBillete")[0].innerHTML =
            sobre.valorBillete;
         htmlSobre.getElementsByClassName("vSobres_cantidad")[0].innerHTML =
            sobre.cantidad;
         htmlSobre.getElementsByClassName("vSobres_subTotal")[0].innerHTML =
            sobre.subTotal();
         this.rptrSobres.appendChild(htmlSobre);
      });
      this.lblTotalDinero.innerHTML = this.app.mSobres.totalDinero();
   }
}

class Cl_app {
   constructor() {
      this.mSobre = new Cl_sobre();
      this.mSobres = new Cl_sobres();
      this.vSobre = new Cl_vSobre(this);
      this.vSobres = new Cl_vSobres(this);
      this.cargarSobresIniciales();
   }

   cargarSobresIniciales() {
      this.mSobres.agregar(new Cl_sobre(1, 10, 5));
      this.mSobres.agregar(new Cl_sobre(2, 20, 2));
      this.mSobres.agregar(new Cl_sobre(3, 100, 4));
      this.mSobres.agregar(new Cl_sobre(4, 50, 3));
      this.vSobres.listarInfo();
   }
}

let app = new Cl_app();
