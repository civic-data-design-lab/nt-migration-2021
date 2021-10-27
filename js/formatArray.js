fetch('data/mapbox/motivations/nt-survey-points.json')
    .then(response => {
        return response.json();
    })
    .then(function (data) {
        surveyPtsJson = data.features;
        console.log(surveyPtsJson);

        if (!coordArray.length) {

            for (let i = 0; i < surveyPtsJson.length; i++) {
                coords = [surveyPtsJson[i].geometry.x, surveyPtsJson[i].geometry.y]
                coordArray.push(coords);
            }
            console.log(coordArray);

            function download(content, fileName, contentType) {
                var a = document.createElement("a");
                var file = new Blob([content], { type: contentType });
                a.href = URL.createObjectURL(file);
                a.download = fileName;
                a.click();
            }
            download(JSON.stringify(coordArray), 'json.json', 'application/json');
        };
    })
