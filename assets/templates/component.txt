// External interface defining input and output bindings
interface <%= ComponentName %>Bindings {
	inputObject: object;
	inputStringLiteral: string;
	outputEvent: () => void;
}

// Internal interface defining contract between component controller and template
interface <%= ComponentName %>Component extends <%= ComponentName %>Bindings {
	add: () => void;
	update: () => void;
	delete: () => void;
	cancel: () => void;
}

class <%= ComponentName %>Controller implements <%= ComponentName %>Component {
	inputObject: object;
	inputStringLiteral: string;
	outputEvent: () => void;

    static $inject = ['$mdDialog', '$mdToast'];
    constructor(
        private $mdDialog: ng.material.IDialogService,
        private $mdToast: ng.material.IToastService,
    ) { }

    $onInit(): void { }

    $onChanges(changes: any): void { }

	add(): void { }

	update(): void { }

	delete(): void { }

	cancel(): void { }
}

class <%= ComponentName %> implements ng.IComponentOptions {
    bindings: { [key: string]: string };
    controller: ng.Injectable<ng.IControllerConstructor>;
    templateUrl: string;

    constructor() {
        this.templateUrl = 'Views/ContactMoments/<%= ComponentName %>/<%= ComponentName %>.html';
        this.controller = <%= ComponentName %>Controller;
        this.bindings = {
			inputObject: '<',
			inputStringLiteral: '@',
			outputEvent: '&',
        };
    }
}

angular.module('citycontrol').component('cc<%= ComponentName %>', new <%= ComponentName %>());