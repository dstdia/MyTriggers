import { LightningElement, api, track } from 'lwc';

/**
 * Show an item
 */
export default class EventCentricFilter extends LightningElement {
    @track valueSobjects = [];
    @track valueClasses = [];
    @track valueBA = '';
    @track valueCRUD = '';
   
    @track filterOptions = {"optionTiming" : [], "optionDml":[],"optionClass":[],"optionSobject":[]};

    @api
    set options(value) {
        console.log("EventCentricFilter set options");
		console.log(JSON.stringify(value));
		console.log(JSON.stringify(this.filterOptions.optionClass));

		let isChanged = false;
		if (this.filterOptions.optionClass) {
			isChanged = this.isAnyChanged(value);
		}

        this.filterOptions = value;
        if (value.optionTiming  && !this.initialized) {
            this.setupDefaultValues();
			this.initialized = true;
        } else

		if (isChanged && this.initialized) {
			console.log("this.isAnyChanged");
			this.setupDefaultValues();
			this.dispatchFilterChange();
		}
    }

    get options() {
        //console.log("EventCentricFilter get options");
        return this.filterOptions;
    }

    setupDefaultValues() {
        //console.log("EventCentricFilter setupDefaultValues");
        
        this.valueBA = this.filterOptions.optionTiming[0].value;

        this.valueCRUD = this.filterOptions.optionDml[0].value;

		this.valueSobjects = [];
        for (let i = 0; i < this.filterOptions.optionSobject.length; i++) {
            this.valueSobjects.push(this.filterOptions.optionSobject[i].value);
        }

		this.valueClasses = [];
        for (let i = 0; i < this.filterOptions.optionClass.length; i++) {
            this.valueClasses.push(this.filterOptions.optionClass[i].value);
        }
        //this.valueBA = this.filterOptions.optionTiming;
        //console.log(JSON.stringify(this.valueBA));
        //console.log(JSON.stringify(this.valueCRUD));
        //console.log(JSON.stringify(this.valueSobjects));
        //console.log(JSON.stringify(this.valueClasses));

        //this.dispatchFilterChange();
    }

	isAnyChanged(newOptions) {
		console.log("@isAnyChanged");
		
		if (JSON.stringify(this.filterOptions.optionTiming) !== JSON.stringify(newOptions.optionTiming)) {
			return true;
		}
		if (JSON.stringify(this.filterOptions.optionDml) !== JSON.stringify(newOptions.optionDml)) {
			return true;
		}
		if (JSON.stringify(this.filterOptions.optionSobject) !== JSON.stringify(newOptions.optionSobject)) {
			return true;
		}
		if (JSON.stringify(this.filterOptions.optionClass) !== JSON.stringify(newOptions.optionClass)) {
			return true;
		}
		return false;
	}

    get optionsBA() {
        return this.filterOptions.optionTiming;
    }

    get optionsCRUD() {
        return this.filterOptions.optionDml;
    }

    get optionsSobjects() {
        return this.filterOptions.optionSobject;
    }

    get optionsClasses() {
        return this.filterOptions.optionClass;
    }

    handleClassChange(event) {
        this.valueClasses = event.detail.value;
        this.dispatchFilterChange();
    }

    handleDMLTypeChange(event) {
        this.valueCRUD = event.detail.value;
        this.dispatchFilterChange();
    }

    handleDMLTimingChange(event) {
        this.valueBA = event.detail.value;
        this.dispatchFilterChange();
    }

    handleSobjectChange(event) {
        this.valueSobjects = event.detail.value;
        this.dispatchFilterChange();
    }

    dispatchFilterChange() {
        //console.log("EventCentricFilter dispatchFilterChange");
        //console.log(JSON.stringify(this.valueClasses));
        let valueClasses = [];
        for (var i = 0; i < this.valueClasses.length; i++) {
            valueClasses.push(this.valueClasses[i]);
        }
        //console.log(JSON.stringify(this.valueSobjects));
        let valueSobjects = [];
        for (var i = 0; i < this.valueSobjects.length; i++) {
            valueSobjects.push(this.valueSobjects[i]);
        }
        //alert(JSON.stringify(valueClasses) + ' ' + JSON.stringify(valueSobjects) + ' ' + JSON.stringify(this.valueCRUD) + ' ' + JSON.stringify(this.valueBA));
        this.dispatchEvent(
            new CustomEvent(
                'filterchange', 
                { 
                    detail: {
                        "classValue" : valueClasses,
                        "sobjectsValues" : valueSobjects,
                        "crudValue" : this.valueCRUD,
                        "timingValue" : this.valueBA
                    }
                }
            )
        );
    }
}