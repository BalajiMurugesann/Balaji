import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const result=await fetch(config.backendEndpoint+`/reservations/`);
    const data=await result.json();
    return data;
  }catch(e){
  return null;
}
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  
  reservations.forEach((key) => {
    let ele = document.createElement("tr");
    ele.innerHTML = `
      <th scope="row">${key.id}</th>
      <td>${key.name}</td>
      <td>${key.adventureName}</td>
      <td>${key.person}</td>
      <td>${new Date(key.date).toLocaleDateString("en-IN")}</td>
      <td>${key.price}</td>
      <td>${new Date(key.time).toLocaleString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })}
    </td>
      <td>
      <div class="reservation-visit-button" id="${key.id
      }"><a href="../detail/?adventure=${key.adventure
    }">Visit Adventure</a>
    </div>
    </td>
    `;
    document.getElementById("reservation-table").appendChild(ele);
  });
  
  
}

export { fetchReservations, addReservationToTable };
