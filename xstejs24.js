/*
 *	Projekt do předmětu WAP
 *	Dynamická tabulka
 *	Autor: Bc. Jakub Stejskal
 *  Popis: Skript realizuje filtrování a řazení v libovolné html tabulce
*/

// Hlavní zdroj - https://www.w3schools.com/howto/howto_js_filter_table.asp
// http://stackoverflow.com/questions/3248869/how-do-i-get-data-from-a-data-table-in-javascript

var table;

// Funkce pro vytvoření formulářů u jednotlivých sloupců tabulky
function createForms(tableId) {
	// načtení tabulky
	table = document.getElementById(tableId);	
	var tableHead = table.tHead;

	// Získání počtu sloupců
	if(tableHead){
		colCount = tableHead.rows[0].cells.length
		console.log(colCount);
	}
	else{
		// tabulka nemá hlavičku, spočítají se řádky a vytvoří se prázdná hlavička pouze pro filtrovací formuláře (filtrování umožňěno)
		colCount = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length;
		tableHead = document.createElement('thead');
		table.insertBefore(tableHead, tableHead.getElementsByTagName('tbody')[0]);
		console.log(colCount);
	}

	//newTableHead = table.createTHead(); // 
	//newTableHead = document.createElement('thead');
	//var row = tableHead.insertRow(0);

	// Add search formular to all columns
	for (i = 0; i < colCount; i++){
		var newCell = document.createElement('th');
		newCell.innerHTML = '<div class="sort"><button onclick="sortTable('+i+',true)" class="sortAsc"/><button onclick="sortTable('+i+',false)" class="sortDsc"/>'
		newCell.innerHTML += '<input type="text" class="cell" id="form_'+i+'" onkeyup="filterData('+colCount+')" placeholder="Filter by.."/></div>';
		tableHead.appendChild(newCell);
		//newTableHead.appendChild(cell);
		//tableHead.insertBefore(cell, tableHead.getElementsByTagName('td')[0]);
	}
	table.insertBefore(tableHead, table.getElementsByTagName('tbody')[0]);
	//table.insertBefore(newTableHead, table.getElementsByTagName('thead')[0]);
};

// Filtrace jednotlivých řádků na základě vstupu z formuláře
// POZOR! Filtrování je momentálně case-insensitive, pro změnu je nutné všude smazat ".toUpperCase()" !!!
function filterData(colCount){
	var i,j;
	// získání všech řádků jako objektu
	var tr = table.tBodies[0].getElementsByTagName('tr');
	
	// procházení řádků
	for (j = 0; j < tr.length; j++){
		var showThisLine = true;
		// procházení sloupců
		for (i = 0; i < colCount; i++) {
			var input = document.getElementById('form_'+i);		// Získání jednotlivých formulářů podle označení form_n kde n je číslo
			var filter = input.value.toUpperCase();				// Získání hodnoty z jednotlivých formulářů pro filtrování
			var td = tr[j].getElementsByTagName('td')[i];
//			console.log("Filtruji podle: "+input.value);
			if (td) {
	//			console.log(td.innerHTML.toUpperCase());
				// Filtrování obsahu
				if (td.innerText.toUpperCase().indexOf(filter) < 0){
					showThisLine = false;	// Nastavení příznaku pro zobrazení řádky
				} 
			}
			
		}
		// Zobrazení/skrytí řádku na základě příznaku showThisLine
		if (showThisLine) {
			tr[j].style.display = "";
		} 
		else {
			tr[j].style.display = "none";
			//console.log(td.innerHTML+"	-> Nevyhovuje");
		}
	
	} 
}


// https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(cellId,asc){
	// získání typu sloupce
	var type = table.tHead.rows[0];	
	// získání datového typu z tabulky pokud není hlavička/z hlavičky
	var sortType = type === undefined ? table.tBodies[0].getElementsByTagName('td')[cellId].getAttribute("data-type") : type.cells[cellId].getAttribute("data-type");
	// deklarace proměnných
	var switching = true;		// Příznak pro prohození hodnot
	var shouldSwitch;			// Přiznak pro "mám prohodit?"
	var i;

	// řazení
	while(switching){
		switching = false;
		rows = table.tBodies[0].getElementsByTagName("tr");

		for (i = 0; i < (rows.length-1); i++){
			shouldSwitch = false;
			var x = rows[i].getElementsByTagName("td")[cellId];
			var y = rows[i+1].getElementsByTagName("td")[cellId];
			// Rozlišení datových typů pro řazení - text a číslo
			x = sortType === "int" ? parseInt(x.innerHTML) : x.innerHTML.toUpperCase()
			y = sortType === "int" ? parseInt(y.innerHTML) : y.innerHTML.toUpperCase()

			//console.log("SortType: "+sortType+", value: "+x);
			//console.log("SortType: "+sortType+", value: "+y);
			
			// Vzestupné řazení
			if(asc){
				//shouldSwitch = x > y ? true : false;
				//break;
				if(x > y){
					shouldSwitch = true;
					break;
				}
			}
			// Sestupné
			else{
				//shouldSwitch = x < y ? true : false;
				//break;
				if(x < y){
					shouldSwitch = true;
					break;
				}
			}
		}
		//console.log(shouldSwitch);
		// Pokud mám prohodit tak prohodím hodnoty
		if (shouldSwitch){
			rows[i].parentNode.insertBefore(rows[i+1],rows[i]);
			switching = true;
		}
	}
}

// Vyvolání javascriptu
window.onload = function(){
	createForms('myTable');
};





