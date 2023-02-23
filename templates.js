const projectTemplate = 
'<div id = "project" onclick="location.href = \'{PRJCTLINK}\'">'
+		'<div style="background-image: url({IMG});" id="projectInner">'
+			'<div id="titleDiv">'
+				'<p id="projectTitle"localize>{TITLE}</p>'
+			'</div>'
+			'<div id="descDiv">'
+				'<p id="projectDesc"localize>{DESCRIPTION}</p>'
+			'</div>'
+		'</div>'
+	'</div>'

/*
<div id="project" onclick="location.href='{PRJCTLINK}'">
	<div style="background-image: url({IMG});" id="projectInner">
		<div id="titleDiv">
			<p id="projectTitle"localize="TITLE">{TITLE}</p>
		</div>
		<div id="descDiv">
			<p id="projectDesc"localize="DESCRIPTION">{DESCRIPTION}</p>
		</div>
	</div>
</div>
*/

const langElement = 
'<!--Languages-->'
+	'<link rel="stylesheet" href="/Styles/Language.css" />'
+	'<div id="langDiv">'
+		'<ul id="langBar">'
+			'<li id="langList"><img id="DK-FLAG" class="langImg" src="/Icons/DK-flag.png" onclick="changeLang(\'DK\')"></li>'
+			'<li id="langList"><img id="EN-FLAG" class="langImg" src="/Icons/EN-flag.png" onclick="changeLang(\'EN\')"></li>'
+			'<li id="langList"><img id="NL-FLAG" class="langImg hidden" src="/Icons/NL-flag.png" onclick="changeLang(\'NL\')"></li>'
+		'</ul>'
+	'</div>'