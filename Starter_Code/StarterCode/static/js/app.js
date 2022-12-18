function metaData(sample) {
    d3.json("./samples.json").then((data) => {
    let metadata = data.metadata;
    let dataArray = metadata.filter(filterData => filterData.id == sample);
    let results = dataArray[0];
    let dropdownMenu = d3.select("#sample-metadata");
    dropdownMenu.html("")
    for (metaDatas in results){
        dropdownMenu.append("h6").text(`${metaDatas}: ${results[metaDatas]}`)
    }  
})
    
}

function charts(sample) {
    d3.json("./samples.json").then((data) => {
    console.log("test")
    let metadata = data.samples;
    let dataArray = metadata.filter(filterData => filterData.id == sample);
    let results = dataArray[0];
    let otu_ids = results.otu_ids;
    let sample_values = results.sample_values;
    let otu_labels = results.otu_labels;

    let trace1 = {
        x: otu_ids,
        y: sample_values,
        
        type: "bar"
      };
    
    // Data trace array
    let traceData = [trace1];
    
    // Apply the group barmode to the layout
    let layout = {
      title: "Bellybutton Bar Chart"
    };
    
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", traceData, layout);
    

    let trace2 = {
        x: otu_ids,
        y: sample_values,
        type: "bubble"
      };
      
      // Data trace array
      let traceData2 = [trace2];
      
      // Apply the group barmode to the layout
      let layout2 = {
      title: "Bellybutton Bubble Chart"
      };
      
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bubble", traceData2, layout2);


    })
}




function init(){
  d3.json("./samples.json").then(function(data){
    console.log(data)
  
  // let data = d3.json("../../samples.json");
  let selection = d3.select("#selDataset");
  let id = data.names;

  for (let i = 0; i < id.length; i++){
    selection 
      .append("option")
      .text(id[i])
      .property("value",id[i]);
  };

  let data2 = id[0];
  charts(data2);
  metaData(data2);
})
}
init();

function optionChanged(new_id){
  charts(new_id);
  metaData(new_id);
}
