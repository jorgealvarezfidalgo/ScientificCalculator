"use strict";
class Calculadora {
	
     constructor (display, memoria){
        this.display=display;
		this.memoria=memoria;
		this.calculado=0;
    }
	
	mostrar() {
		document.getElementById('display').value = this.display;
	}
	
	setDisplay(display){
		this.display= display;
	}
	
	getDisplay(){
		return this.display;
	}
	
    introducirDigito(x){
		if(this.calculado == 0) {
			var n = this.getDisplay().lastIndexOf(" ");
			if(this.getDisplay().substring(n+1,n+2)!="0"){
				this.setDisplay(this.display + x);
			}
			else if(x!="0"){
				this.setDisplay(this.getDisplay().substring(0,n+1)+ x);
			}
		}
		else {
			this.calculado = 0;
			this.setDisplay("" + x);
		}
		this.mostrar();
    }
	
	introducirOperacion(x){
		var len = this.getDisplay().length;
		if(len>0 && (this.esDigito(this.getDisplay().charAt(len-1)) || this.getDisplay().charAt(len-1) == ')')){
			this.setDisplay(this.display + x);
			this.calculado = 0;
		} else if (len>0){
			this.setDisplay(this.display.substring(0, len-3) + x);
		}
		this.mostrar();
	}
	
	calcular(){
		if(this.display != "") {
			 try { 
				this.setDisplay("" + eval(this.display));
			}
			catch(err) {
				this.setDisplay("Operación no admitida");
			}
		}
		this.calculado = 1;
		this.mostrar();
	}
	
	limpiar() {
		this.setDisplay("");
		this.mostrar();
	}
	
	mostrarMemoria(){
		this.setDisplay("" + this.memoria);
		this.calculado = 1;
		this.mostrar();
	}
	
	operarMemoria(op) {
		var n;
		var ultimoCar;
		if(this.getDisplay().length>1){
			n = this.ultimoEspacio();
			ultimoCar = this.getDisplay().charAt(n+1);
			if(this.esDigito(ultimoCar) || n==-1){
				this.memoria = eval(this.memoria +op + this.getDisplay());
			} else {
				this.memoria = eval(this.memoria + op + this.getDisplay().substring(0,n-2));
			}
		}
		else if(this.getDisplay().length==1){
			this.memoria = eval(this.memoria +op + this.getDisplay());
		}
	}
	
	borrarMemoria(){
		this.memoria = "";
	}
	
	esDigito(x){
		return(x=="0" || x=="1" || x=="2" || x=="3" || x=="4" || x=="5" ||
				x=="6" || x=="7" || x=="8" || x=="9");
	}
	
	ultimoEspacio() {
		return this.getDisplay().lastIndexOf(" ");
	}
}

class CalculadoraCientifica extends Calculadora{
    constructor (display, memoria){
        super(display, memoria);
		this.base = true;
    }
	
	guardarMemoria() {
		var n;
		var ultimoCar;
		if(super.getDisplay().length>1){
			n = super.ultimoEspacio();
			ultimoCar = super.getDisplay().charAt(n+1);
			if(super.esDigito(ultimoCar) || n==-1){
				super.memoria = eval(super.getDisplay());
			} else {
				super.memoria = eval(super.getDisplay().substring(0,n-2));
			}
		}
		else if(super.getDisplay().length==1){
			super.memoria = eval(super.getDisplay());
		}
		
	}
	
	calcularPi(){
		this.eliminarUltimoValor();
		super.introducirDigito(Math.PI);
	}
	
	calcularSeno(){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
		if(this.base){
		super.introducirDigito(Math.sin(Number(ultimo)));
		}
		else {
			super.introducirDigito(Math.asin(Number(ultimo)));
		}
		}
	}
	
	calcularCoseno(){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
		if(this.base){
		super.introducirDigito(Math.cos(Number(ultimo)));
		}
		else {
			super.introducirDigito(Math.acos(Number(ultimo)));
		}
		}
	}
	
	calcularTangente(){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
			if(this.base){
			super.introducirDigito(Math.tan(Number(ultimo)));
			}
			else {
				super.introducirDigito(Math.atan(Number(ultimo)));
			}
		}
	}
	
	calcularRaiz(){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
		super.introducirDigito(Math.sqrt(Number(ultimo)));
		}
	}
	
	calcularPotenciaBase10(){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
			super.introducirDigito(Math.pow(10,Number(ultimo)));
		}
		}
	
	calcularLogaritmo(){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
			super.introducirDigito(Math.log(Number(ultimo)));
		}
	}
	
	calcularLogaritmoBase10(){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
			super.introducirDigito(Math.log(Number(ultimo))/Math.log(10));
		}
	}
	
	calcularExp(){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
			super.introducirDigito(Math.exp(Number(ultimo)));
		}
	}
	
	calcularFactorial(){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
			super.introducirDigito(this.factorial(Number(ultimo)));
		}
	}
	
	multiplicarBase10(x){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
			
			super.introducirDigito(Number(ultimo) * Math.pow(10,Number(x)));
		}
	}
	
	factorial (n) {
	if (Math.round(n)== 0 || Math.round(n) == 1)
		return 1;
	return this.factorial(n-1) * n;
	}
	
	eliminarUltimoValor(){
		var esp = super.ultimoEspacio();
		var ultimoCar = super.getDisplay().charAt(esp+1);
		if(ultimoCar==")") {
			var comienzo = super.getDisplay().lastIndexOf("(");
			super.setDisplay(super.getDisplay().substring(0,comienzo));
		} 
		else if(super.esDigito(ultimoCar) || ultimoCar=="-" && super.esDigito(super.getDisplay().charAt(esp+2))){
			super.setDisplay(super.getDisplay().substring(0,esp+1));
		}
		super.mostrar();
	}
	
	ultimoValor() {
		var n = super.ultimoEspacio();
		var ultimo = super.getDisplay().substring(n+1,n+2);
		var ultimoValor;
		if(ultimo==")") {
			var comienzo = super.getDisplay().lastIndexOf("(");
			ultimoValor = eval(super.getDisplay().substring(comienzo,n+2));
		} 
		else {
			ultimoValor = super.getDisplay().substring(n+1);
		}
		return ultimoValor;
	}
	
	calcularPotencia(exp){
		var ultimo = this.ultimoValor();
		this.eliminarUltimoValor();
		
		if(super.esDigito(eval((""+ultimo).charAt((""+ultimo).length-1)))){
			super.introducirDigito(Math.pow(Number(ultimo),exp));
		}
	}
	
	cambiarSigno() {
			var ultimo = this.ultimoValor();
			this.eliminarUltimoValor();
			super.introducirDigito(Number(ultimo/-1));	
	}
	
	borrar(){
		super.setDisplay(super.getDisplay().substring(0,super.getDisplay().length-1));
		super.mostrar();
	}
	
	cambiarBotones(){
		if(this.base==true) {
			this.base = false;
			document.getElementById('sin').value = "sin⁻¹";
			document.getElementById('cos').value = "cos⁻¹";
			document.getElementById('tan').value = "tan⁻¹";
			document.getElementById('iniciofila2').value = "x³";
			document.getElementById("iniciofila2").onclick = function () { cal.calcularPotencia(3); };
			document.getElementById('poty').value = "ʸ√x";
			document.getElementById("poty").onclick = function () { cal.introducirOperacion(' ** ( 1 / '); };
			document.getElementById('iniciofila3').value = "1/x";
			document.getElementById("iniciofila3").onclick = function () { cal.calcularPotencia(-1); };
			document.getElementById('10x').value = "eˣ";
			document.getElementById('10x').onclick = function () { cal.calcularExp(); };
			document.getElementById('log').value = "ln";
			document.getElementById("log").onclick = function () { cal.calcularLogaritmo(); };
		}
		else {
			this.base = true;
			document.getElementById('sin').value = "sin";
			document.getElementById('cos').value = "cos";
			document.getElementById('tan').value = "tan";
			document.getElementById('iniciofila2').value = "x²";
			document.getElementById("iniciofila2").onclick = function () { cal.calcularPotencia(2); };
			document.getElementById('poty').value = "xʸ";
			document.getElementById("poty").onclick = function () { cal.introducirOperacion(' ** '); };
			document.getElementById('iniciofila3').value = "√";
			document.getElementById("iniciofila3").onclick = function () { cal.calcularRaiz(); };
			document.getElementById('10x').value = "10ˣ";
			document.getElementById("10x").onclick = function () { cal.calcularPotenciaBase10(); };
			document.getElementById('log').value = "log";
			document.getElementById("log").onclick = function () { cal.calcularLogaritmoBase10(); };
		}
	}
	
}
var cal = new CalculadoraCientifica("","");