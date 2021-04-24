import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import competitionsData from './competitionsData';
import './CompetitionList.css';


const columns = [
	{
		dataField: 'nazwa',
		text: 'Nazwa',
		sort: true
	},
	{
		dataField: 'lokalizacja',
		text: 'Lokalizacja',
		sort: true
	},
	{
		dataField: 'data_start',
		text: 'Start',
		sort: true
	},
	{
		dataField: 'data_koniec',
		text: 'Koniec',
		sort: true
	}
];

const defaultSorted = [{
  dataField: 'data_start',
  order: 'desc'
}];


function CompetitionList(){

	/* const[competitionsData,setData] = useState([])
	useEffect(() =>{
		fetch()
		.then(response => response.json())
		.then((json) = setData(json));
	} */

	return(
		<div class="competitionsDataList">
			<p class="competitionsListHeader">Lista wszystkich zawodów</p>
			<div class="container">
				<BootstrapTable class="table table-striped table-bordered table-hover" id="competitionsTable"
					keyField="Nazwa"
					data={ competitionsData }
					columns={ columns }
					defaultSorted={ defaultSorted }  />
			</div>
		</div>
	)
}
export default CompetitionList;