var formdata=[];
var selectedRow=null;

/*function onFormSubmit() {

        
        if (selectedRow==null){
            storeData();
		}
        else{
            updateRecord();
		}
        resetForm();    
}*/




function storeData(){

  
     formdata=JSON.parse(localStorage.getItem('formdata'))||[];
  
    formdata.push({
  
      tid:document.getElementById("id").value,
      name:document.getElementById("name").value,
      status:document.getElementById("status").value,
      stime:document.getElementById("start time").value,
      etime:document.getElementById("end time").value,
  
    });
  
    localStorage.setItem('formdata',JSON.stringify(formdata));
   
    showData();
    
  }
  window.onload=showData();
  
  function showData(){
  
  console.log(localStorage.getItem('formdata'));
  
  if(localStorage.getItem('formdata')){
  
    var output=document.querySelector('tbody');
  
    output.innerHTML="";
    JSON.parse(localStorage.getItem('formdata')).forEach((data,index)=>{
  
      output.innerHTML+=`<tr>
                            <td>${data.tid}</td>
                            <td>${data.name}</td>
                            <td>${data.status}</td>
                            <td>${data.stime}</td>
                            <td>${data.etime}</td>
                            <td><button onmouseover="edit(this,${index})"><i class="fa-solid fa-pen-to-square" ></i>
                            <button onclick="remove(this,${index})"><i class="fa-solid fa-trash"></i></td>
                        </tr>
      `;
  
    })
   }
  }
function edit(td,index){
  
  var selectedRow=td.parentElement.parentElement;
  document.getElementById("id").value=selectedRow.cells[0].innerHTML;
  document.getElementById("name").value=selectedRow.cells[1].innerHTML
  document.getElementById("status").value=selectedRow.cells[2].innerHTML
  document.getElementById("start time").value=selectedRow.cells[3].innerHTML
  document.getElementById("end time").value=selectedRow.cells[4].innerHTML

}



function remove(td,index){
  if (confirm('Are you sure want to delete this record?')){
    var selectedRow=td.parentElement.parentElement;
    var tarr=JSON.parse(localStorage.getItem('formdata'));
    console.log(tarr);
    document.getElementById('taskdetails').deleteRow(selectedRow.rowIndex);
    tarr.splice(index,1);
   
    localStorage.setItem('formdata',JSON.stringify(tarr));
    resetForm();

}
}
function resetForm() {
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("status").value = '';
    document.getElementById("start time").value = '';
    document.getElementById("end time").value = '';
   selectedRow=null;
}

function updateRecord() {
  alert(selectedRow)
  alert("Update method called");
  selectedRow.cells[0].innerHTML = document.getElementById("id").value;
  selectedRow.cells[1].innerHTML =  document.getElementById("name").value; 
  selectedRow.cells[2].innerHTML =  document.getElementById("status").value;
  selectedRow.cells[3].innerHTML =  document.getElementById("start time").value;
  selectedRow.cells[4].innerHTML= document.getElementById("end time").value;
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("taskdetails");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function filterData() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchbtn");
  filter = input.value.ignoreCase;
  table = document.getElementById("taskdetails");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
 
}