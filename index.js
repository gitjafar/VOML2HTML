// Note that you need some basic understanding of regular expressions to understand this code.
// You can use the interactive tutorial on https://regexone.com/ to quickly learn the basics.
//
// In short:
// - the GetHtml4VOResouce method further in the code uses regex to convert vo resource code to html
// - anything between parantheses (e.g. '(' & ')') represents a group
// - \s stands for space characters
// - * stands for 0 or more, while + stands for 1 or more 
// - \w stands for word characters (including alphanumeric words)
// - \d stands for digit characters
// - /expression/ followed by optional special chars is a common way to represent regular expressions
// - https://regex101.com/ can be used for pattern visualisation
// 
function UpdateUI()
{
    var uiPanel = document.getElementById("UIPanel");
    var text = document.getElementById("codeArea").value;
    var textParts = text.split(/(\r*\n)/g);
    uiPanel.innerHTML = "";
    for (let index = 0; index < textParts.length; index++) {
        const element = textParts[index];
        uiPanel.innerHTML += GetHtml4VOResouce(element);
    }
    MapVOClassesToJQueryUIControls();
}

function GetHtml4VOResouce(element)
{
    var myRegex = /\s*CONTROL\s"(.*?)",\s*(\w+), "(.*?)", .*?(\d+), (\d+), (\d+), (\d+)/;
    var groupValues = myRegex.exec(element);
    if(groupValues == null) return "";
    
    var groupIndex = 1;
    var controlsTextValue = groupValues[groupIndex++];
    var controlName = groupValues[groupIndex++];
    var controlClass = groupValues[groupIndex++];
    var controlStyleText = ([
        `left: ${groupValues[groupIndex++]}px`, `top: ${groupValues[groupIndex++]}px`,
        `width: ${groupValues[groupIndex++]}px`, `height: ${groupValues[groupIndex++]}px`,
    ].join(";"));
    var controlAttributes = [
        `id="${controlName}"`, `title="${controlName}"`,
        `class="vocontrol ${controlClass}" style="${controlStyleText}"`
    ].join(" ");
    return (
        `<div ${controlAttributes}>${controlsTextValue}</div>`
    );
}

function MapVOClassesToJQueryUIControls()
{
    $(".vocontrol.edit").html(`<input style="width:100%;height:100%" />`);
    $(".vocontrol.button").button();
    $(".vocontrol.msctls_progress32").progressbar({value: 37});
    $(".vocontrol.SysListView32").html([
        `<div class="ui-widget-content">Listview</div>`,
        `<div class="ui-widget-content">Items</div>`
    ].join(""));
    $(".vocontrol.ComboBox").html(
        `<select style="display:inline-block;"><option>item1</option><option>item2</option></select>`
    );
    $(".vocontrol.ComboBox select").selectmenu();
    $.each($('select'), function () {
        $(this).selectmenu({ width : $(this).width()})
    });
    $(".vocontrol.SysListView32").selectable();
}