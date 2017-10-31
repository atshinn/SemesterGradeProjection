var schedule = [];

//the main divs that come in an out of view. 
var main_buttons_div = document.getElementById('div-mainview-buttons');
var add_class_div = document.getElementById('create-class');
var new_projection_div = document.getElementById('new-projection-div');
var edit_category_values_div = document.getElementById('edit-category-values');

function Class(cats,assigns){
    this.categories=cats;
    this.assignments= assigns;
}

function Assignment(score,category){
    this.total = parseDouble((score.split("[\/]")[1]));
    this.earned = parseDouble((score.split("[\/]")[0]));
    this.grade = (this.earned / this.total);

}

function Categories(name,weight,totalAssignments){
    this.name = name;
    this.weight = weight;
    this.numberOfAssignments = numberOfAssignments;
    
}

function new_schedule(){    
    main_buttons_div.style.display="none";

    add_class_div.style.display="block";
}

//======================================================
//Adding Category to a new Class
//======================================================
var selected_category_count = 0;
function add_category(){
    var cat_para = document.getElementById("selected-cats");
    var selected = get_selected('selection');

    
    for(var i = 0 ; i < selected.length ; i++){
        var sel_op = selected[i].value;
       
        //if not duplicate
        if(cat_para.innerHTML.indexOf(sel_op) == -1){
            if(selected_category_count != 0){
                cat_para.innerHTML+= ', ';
            }
            cat_para.innerHTML += sel_op;
            selected_category_count++;
        }
        alert(selected_category_count);
        handle_sched_edit_buttons();
    }    
}

//======================================================
//undo Category to a new Class
//======================================================

function undo_cat(){
    var cat_para = document.getElementById("selected-cats");
    var categories = cat_para.innerHTML.split(",");
    var para_text = ""
    cat_para.innerHTML = "";
    
    for(var i = 0 ; i < categories.length - 1; i++){
        para_text += categories[i];
        if(selected_category_count != 0){
            para_text += ", ";
        }
    }
    if(para_text.indexOf("Categories: ")){
        cat_para.innerHTML += "Categories: ";
    }
    cat_para.innerHTML += para_text;
    selected_category_count--;
    handle_sched_edit_buttons();
}

//======================================================
//Create Class
//======================================================
function edit_class(){
    add_class_div.style.display="none";
    edit_category_values_div.style.display = "block";
    main_buttons_div.style.display="none";
    
    var categories = document.getElementById('selected-cats').innerHTML;    
    categories = categories.split("Categories: ")[1];
   
    
    var headers = ['Category','Weight(%)','Grades(earned/total)'];
    
    var parent = document.getElementById('edit-category-table-div');
    var id = 'cat-edit-table';
    var name = 'table';
    var contents = categories.split(',');
    var rows = contents.length;

    alert('contents = ' + contents + "\n"+
    'rows = ' + rows 
        )
    create_table(id,headers,rows,contents);
    
}

//======================================================
//Add another class
//======================================================
function add_another_class(){
    add_class_div.style.display="block";
    edit_category_values_div.style.display = "none";
    main_buttons_div.style.display="none";

    //reset class entry form


}

//======================================================
//Finished adding classes to schedule
//======================================================
function finish_class_addition(){
    add_class_div.style.display="none";
    edit_category_values_div.style.display = "none";
    main_buttons_div.style.display="block";

    //get all inputed values from table

    //create class object

    //update schedule table
}
//======================================================
//HELPERS
//======================================================

//maintains button states when adding a class
function handle_sched_edit_buttons(){
    var ADD = 0, UNDO = 1, NEXT = 2;
    var btns = document.getElementsByClassName("schedule-btn");

    if(selected_category_count > 0){
        btns[UNDO].disabled = false;
       
    }
    else{
        btns[UNDO].disabled = true;
    }

    if(selected_category_count == 11){
        btns[ADD].disabled = true;
    }
    else{
        btns[ADD].disabled = false;
    }
}

//used for disabling and enabling buttons
function toggle_disabled(id){
    var temp = document.getElementById(id);
    var toggle = false;
   
    if(temp.disabled){
        temp.disabled = toggle;
    }
    else{
        temp.disabled = !toggle;
    }
        
}

function get_selected(selectId){
    var selection = document.getElementById(selectId);
    var options = selection.options;
    var results = [];
    for(var i = 0 ; i < options.length ; i++){
        if(options[i].selected){
            results[i] = options[i];
        }
    }
    
    return results;
}

function create_table(id,headers,rows,contents){
    
    var table = document.getElementById('cat-table');
    
    var row = table.insertRow(0);
    
    for(var i = 0 ; i < headers.length; i++){
        var cell = row.insertCell(i);
        cell.innerHTML = headers[i];
    }    

    for(var i = 0 ; i < rows ; i++){
        var row = table.insertRow(i+1);
        var name_cell = row.insertCell(0);
        var weight_cell = row.insertCell(1);
        var grades_cell = row.insertCell(2);

        name_cell.innerHTML = contents[i];
        weight_cell.innerHTML = '<input class="cat-edit-weight" type="text">';
        grades_cell.innerHTML = '<input class="cat-edit-grades" type="text">';
    }
    

}
