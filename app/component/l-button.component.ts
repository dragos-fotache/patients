import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'l-button',
    template: `
	    <div id="area">

            <div *ngIf="!inverted" 
                 id="square-left" 
                 class="ui-button ui-widget ui-state-default ui-button-text-only" 
                 [class.ui-button-green]="green"
                 [class.ui-state-hover]="hover && !disabled"  
                 [class.ui-state-disabled]="disabled"
                 (mouseenter)="onMouseenter($event)"
                 (mouseleave)="onMouseleave($event)"
                 (click)="buttonClicked($event)">
                 <i [class]="'fa fa-2x ' + icon" style="padding-top: 0.6em"></i>
            </div>
            <div *ngIf="!inverted" 
                 id="rectangle-right" 
                 class="ui-button ui-widget ui-state-default ui-button-text-only"
                 [class.ui-button-green]="green"
                 [class.ui-state-hover]="hover && !disabled"  
                 [class.ui-state-disabled]="disabled"
                 (mouseenter)="onMouseenter($event)"
                 (mouseleave)="onMouseleave($event)"
                 (click)="buttonClicked($event)">
                 <span class="ui-button-text" style="padding-left: 0.8em">{{label}}</span>
            </div>

            <div *ngIf="inverted" 
                 id="rectangle-left" 
                 class="ui-button ui-widget ui-state-default ui-button-text-only"
                 [class.ui-button-green]="green"
                 [class.ui-state-hover]="hover && !disabled" 
                 [class.ui-state-disabled]="disabled"
                 (mouseenter)="onMouseenter($event)"
                 (mouseleave)="onMouseleave($event)"
                 (click)="buttonClicked($event)">
                 <span class="ui-button-text" style="padding-left: 0.5em">{{label}}</span>
            </div>
            <div *ngIf="inverted" 
                 id="square-right" 
                 class="ui-button ui-widget ui-state-default ui-button-text-only"
                 [class.ui-button-green]="green"
                 [class.ui-state-hover]="hover && !disabled"  
                 [class.ui-state-disabled]="disabled"
                 (mouseenter)="onMouseenter($event)"
                 (mouseleave)="onMouseleave($event)"
                 (click)="buttonClicked($event)">
                 <i [class]="'fa fa-2x ' + icon" style="padding-top: 0.6em"></i>
            </div>

        </div>
    `,
})
export class LButtonComponent {
    @Input()
    inverted: boolean = false;

    @Input()
    label = "Button";

    @Input()
    icon: String;

    @Input()
    green: boolean = false;

    @Input()
    disabled: boolean = false;

    private hover: boolean;

    @Output()
    private onClick : EventEmitter<MouseEvent>;

    constructor() {
        this.onClick = new EventEmitter<MouseEvent>();
    }

    onMouseenter(e) {
        this.hover = true;
    }

    onMouseleave(e) {
        this.hover = false;
    }

    buttonClicked(e) {
        this.onClick.emit(e);
    }
}