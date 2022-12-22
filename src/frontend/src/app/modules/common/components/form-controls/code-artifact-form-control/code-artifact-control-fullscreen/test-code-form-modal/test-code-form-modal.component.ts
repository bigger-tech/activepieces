import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { fadeInUp400ms } from 'src/app/modules/common/animation/fade-in-up.animation';

import { jsonValidator } from 'src/app/modules/common/validators/json-validator';

@Component({
	selector: 'app-test-code-form-modal',
	templateUrl: './test-code-form-modal.component.html',
	animations: [fadeInUp400ms],
})
export class TestCodeFormModalComponent {
	testCodeForm: UntypedFormGroup;
	editorOptions = {
		lineNumbers: true,
		theme: 'lucario',
		mode: 'javascript',
	};
	@Output() contextSubmitted: EventEmitter<Object> = new EventEmitter();
	submitted = false;
	constructor(private formBuilder: UntypedFormBuilder, private modalRef: BsModalRef) {
		this.testCodeForm = this.formBuilder.group({ context: ['{\n\n}', [Validators.required, jsonValidator]] });
	}

	submitContext() {
		this.submitted = true;
		if (this.testCodeForm.valid) {
			this.contextSubmitted.emit(JSON.parse(this.testCodeForm.get('context')!.value));
			this.hide();
		}
	}
	hide() {
		this.modalRef.hide();
	}
}
