Ext.define('MobaApp.reader.Builds',{
    extend: 'Ext.data.reader.Json',
     process: function(response) {
        var data = response;

        if (response) {
            data = this.getResponseData(response);
        }
        if (data) {
            var parsedData = this.parseBuildData(data);
            return this.readRecords(parsedData);
        } else {
            return this.nullResultSet;
        }
    },
    parseBuildData: function(records){
        for(record in records){
            records[record].hero_id = records[record].hero.id;
        }
        return records;
                    
    }

})