function validate_name(name) {
    if(!name || name.length < 2) {
        return 'Error: min 2 chars'
    }
    else 
        return null
}

function validate_summary(summary) {
    if(!summary || summary.length < 5) {
        return 'Error: min 5 chars'
    }
    else 
        return null
}

function validate_price(price) {
    if(!parseFloat(price))
        return `Invalid price value ${price}`

    else 
        return null
}