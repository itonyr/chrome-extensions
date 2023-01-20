// functions to set the default values
async function setDefaultMissedCount () { 
    console.log("setting default missed count to 0")
    await chrome.storage.local.set( { "missed" : 0 })
}

async function setDefaultTakenCount () { 
    console.log("setting default taken count to 0")
    await chrome.storage.local.set( { "taken" : 0 })
}

// functions to access stored values from the chrome.storage.local API 
async function getTakenCount() { 
    let takenCount = await chrome.storage.local.get("taken")
    if (jQuery.isEmptyObject(takenCount)){
        await setDefaultTakenCount()
        takenCount = await getTakenCount()
        return takenCount
    }
    return takenCount["taken"]
};

async function getMissedCount () { 
    let missedCount = await chrome.storage.local.get("missed")
    if (jQuery.isEmptyObject(missedCount)){
        await setDefaultMissedCount()
        missedCount = await getMissedCount()
        return missedCount
    }
    return missedCount["missed"]
}


// functions to increment/deincrement the counters aand store the value 
async function addTakenCount() { 
    let count = await getTakenCount()
    count++ 
    $("#calls-taken-counter").val(count)
    await chrome.storage.local.set( { "taken" : count } )
}

async function subtractTakenCount() { 
    let count = await getTakenCount()
    count--
    $("#calls-taken-counter").val(count)
    await chrome.storage.local.set( { "taken" : count } )
}

async function addCallMissed() { 
    let count = await getMissedCount()
    count++ 
    $("#calls-missed-counter").val(count)
    await chrome.storage.local.set( { "missed" : count } )
}

async function subtractCallMissed() { 
    let count = await getMissedCount()
    count--
    $("#calls-missed-counter").val(count)
    await chrome.storage.local.set( { "missed" : count } )
}

// function to initialize the counter values on page load
async function initCounters() { 
    let takenCount = await getTakenCount()
    let missedCount = await getMissedCount()
    $("#calls-taken-counter").val(takenCount)
    $("#calls-missed-counter").val(missedCount)
}

async function clearLocalRecords() { 
    await chrome.storage.local.remove(["missed","taken"]) 
    console.log("local records cleared")
    initCounters()
}
// Main block 

$(function(){
    initCounters()

    $("#taken-add").click(function(){
       addTakenCount() 
    });
  
    $("#taken-subtract").click(function(){
        subtractTakenCount()
    });


    $("#missed-add").click(function(){
        addCallMissed()
    });

    $("#missed-subtract").click(function(){
        subtractCallMissed()
    
    });

    $("#clear-btn").click(async function(){
        await clearLocalRecords() 
    });

  }); 