import {Component, Input} from '@angular/core';
import {ObjectService} from 'services/object-service/objects.service';
import {ObjectBlock} from 'components/object-block/object-block';
import {Sortable} from 'components/sortable/sortable';
import {Slimscroll} from 'components/slimscroll/slimscroll';
import {TextFilter} from 'components/text-filter/text-filter';

@Component({
	selector:		'object-block-list',
	directives: [ObjectBlock, Sortable, Slimscroll],
	pipes:			[TextFilter],
	template:	`
		<ul slimscroll [height]="tree?'':'100%'" [sortable]="objects" [ngClass]="{tree: tree}" (changeOrder)="sort($event)" wheel-step="3">
			<li object-block *ngFor="let object of objects | TextFilter:searchText" [object]=object (objectDeleted)="removeObject($event)" attr.data-objectobjectjoinid="{{object.ObjectObjectJoinID}}"></li>
		</ul>
	`,
	styles:			[`
		ul {
			list-style:	none;
			margin: 0;
			padding: 1px 5px 0 0;
		}
		ul, li{     
			position: relative;    
		}
		.tree {
			padding-bottom: 5px;
		}
		li {
			padding 0;
		}
		.tree > li {
			padding: 0 0 0 10px;
		}
		/* chop off overflowing lines */
		ul {
			overflow: hidden;
		}
		.tree li::before, li::after{
			content: '';
			position: absolute;
			left: 0;
		}
		/* horizontal line on inner list items */
		.tree li::before{
			border-top: 1px solid #333;
			top: 10px;
			width: 10px;
			height: 0;
		}
		/* vertical line on list items */    
		.tree li::after{
			border-left: 1px solid #333;
			height: 100%;
			width: 0px;
			top: -10px;
		}
		/* lower line on list items from the first level 
			 because they don't have parents */
		.tree > li::after{
			top: 10px;
		}
		/* hide line from the last of the first level list items */
		.tree > li:last-child::after{
			display:none;
		}
	`]
})

export class ObjectBlockList implements AfterViewInit {
	@Input() objects;
	@Input() tree;
	@Input() searchText = "Master";
	
	constructor(private _objectService: ObjectService) {}
	sort(obj) {
		this.objects.splice(obj.endIndex,0,this.objects.splice(obj.startIndex, 1)[0]);
		let updated_order = Array.from(this.objects, x => x.ObjectObjectJoinID);
		console.log("Updated Order: ", updated_order);
		this._objectService.updateObjectRank(updated_order).subscribe(resp => {console.log(resp);});
	}
	removeObject = (id) => {
		console.log("ID: ", id);
		console.log("Index: ", this.objects.findIndex(function(item) {return item.ObjectID === id;}))
		this.objects = this.objects.filter(function(obj) {
			return obj.ObjectID !== id;
		});
	}
}