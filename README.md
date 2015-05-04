# stylie.treeview
Pure CSS collapsible tree menu, ported from: http://www.thecssninja.com/css/css-tree-menu

```html
	<ol>
	    <li class="file"><a href="document.pdf">File 1</a></li>
	    <li>
	        <label for="subfolder1">Subfolder 1</label>
	        <input type="checkbox" id="subfolder1" />
	        <ol>
	            <li class="file"><a href="">File 2</a></li>
	            <li class="file"><a href="">File 2</a></li>
	            <li class="file"><a href="">File 2</a></li>
	        </ol>
	    </li>
	</ol>
```

```css
li input {
    position: absolute;
    left: 0;
    margin-left: 0;
    opacity: 0;
    z-index: 2;
    cursor: pointer;
    height: 1em;
    width: 1em;
    top: 0;
}
li label {
    background: url(folder-horizontal.png) 15px 1px no-repeat;
    cursor: pointer;
    display: block;
    padding-left: 37px;
}
li input + ol {
    background: url(toggle-small-expand.png) 40px 0 no-repeat;
    margin: -0.938em 0 0 -44px; /* 15px */
    display: block;
    height: 1em;
}
li input + ol > li {
    display: none;
    margin-left: -14px !important;
    padding-left: 1px;
}
li label {
    background: url(folder.png) 15px 1px no-repeat;
}
li.file a {
    background: url(document.png) 0 -1px no-repeat;
    color: #fff;
    padding-left: 21px;
    text-decoration: none;
    display: block;
}
li {
    position: relative;
    margin-left: -15px;
    list-style: none;
}
li.file {
    margin-left: -1px !important;
}
li.file a[href $= '.pdf']     { background-position: -16px -1px; }
li.file a[href $= '.html']    { background-position: -32px -1px; }
li.file a[href $= '.css']     { background-position: -48px -1px; }
li.file a[href $= '.js']      { background-position: -64px -1px; }
```

## Generate with javascript
```json
var sampletree = {
	'tree': [{
		'tree-item': 'file',
		'tree-item-label': 'File Main 1',
		'tree-item-id': 'file1',
		'tree-item-link': '#mainlink',
		'tree-item-attributes': {
			'class': 'added-async-link another-class',
			'title': 'this is a file link'
		}
	}, {
		'tree-item': 'folder',
		'tree-item-label': 'Folder 2',
		'tree-item-id': 'folder2',
		'tree-item-attributes': {
			'class': 'added-async-link another-class',
			'title': 'this is a file link'
		},
		'tree-item-folder-contents': [{
			'tree-item': 'file',
			'tree-item-label': 'File Main 3',
			'tree-item-id': 'file3',
			'tree-item-link': '#mainlink',
			'tree-item-attributes': {
				'class': 'added-async-link another-class',
				'title': 'this is a file link'
			}
		}, {
			'tree-item': 'file',
			'tree-item-label': 'File Main 4',
			'tree-item-id': 'file4',
			'tree-item-link': '#mainlink',
			'tree-item-attributes': {
				'class': 'added-async-link another-class',
				'title': 'this is a file link'
			}
		}]
	}]
};

```

```html
<div id="tree-example-1" class="ts-col-span6 ">
</div>
```

```javascript
var StylieTreeview = require('stylie.treeview'),
	tree1 = sampletree,
	StylieTreeview1;

window.addEventListener('load', function () {
	StylieTreeview1 = new StylieTreeview({
		tree: tree1
	});
	document.querySelector('#tree-example-1').innerHTML = StylieTreeview1.getTreeHTML();
}, false);
```

##Development
*Make sure you have grunt installed*
```
$ npm install -g grunt-cli
```

Then run grunt watch
```
$ grunt watch
```
For generating documentation
```
$ grunt doc
$ jsdoc2md lib/**/*.js index.js > doc/api.md
```