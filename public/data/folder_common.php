<?php

function get_folder($folder_id){

    global $mysqli;
    global $user_id;

    $r = $mysqli->query("SELECT * from folder join folder_placement on folder.id = folder_placement.folder_id  WHERE owner_id = $user_id AND folder.id = $folder_id");
    $row = $r->fetch_assoc();
    
    $folder = array();
    $folder['id'] = $row['id'];
    $folder['title'] = $row['title'];
    $folder['description'] = $row['description'];

    $folder['specimenIds'] = array();
    $r2 = $mysqli->query("SELECT specimen_id from specimen_placement WHERE folder_id = $folder_id AND owner_id = $user_id");
    while($row2 = $r2->fetch_assoc()){
        $folder['specimenIds'][] = $row2['specimen_id'];
    }

    return $folder;

}

?>