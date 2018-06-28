/* global $ */

$('form#itemForm').keypress(function enterSubmitEvent(e) {
  if (e.keyCode === $.ui.keyCode.ENTER) {
    e.preventDefault();
    $(this).parent().find('input#addItemButton').trigger('click');
  }
});

$('button#deleteItemButton').click(function deleteHandler(deleteEvent) {
  deleteEvent.preventDefault();
  const $tr = $(this).closest('tr');
  $.ajax({
    headers: { accept: 'application/json' },
    url: `http://localhost:3000/item/${this.value}`,
    type: 'DELETE',
    success() {
      $tr.remove();
    },
  });
});


$('button#modifyItemButton').click(function modifyHandler(event) {
  event.preventDefault();

  const idItemSelected = $(this).closest('tr').attr('id');
  const currentCellNameItem = $(this).closest(`tr#${idItemSelected}`).children().eq(1);

  function saveChange(modalEvent) {
    modalEvent.preventDefault();

    const newNameItem = $(this).find('input#modifiedNameItem').val();
    $.ajax({
      headers: { accept: 'application/json' },
      type: 'PUT',
      url: `http://localhost:3000/item/${idItemSelected}`,
      data: { name: newNameItem },
      success: function successUpdate(e) {
        e.preventDefault();
        currentCellNameItem.replaceWith(`<td>${newNameItem}</td>`);
        $(this).dialog('close');
      },
    });
  }

  function cancelChange() {
    $(this).dialog('close');
  }

  function enterEvent() {

    $('#dialog-confirm').keypress(function enterKeyPress(e) {
      if (e.keyCode === $.ui.keyCode.ENTER) {
        $(this).parent().find('button:contains(\'Save\')').trigger('click');
      }
    });
  }

  $('#dialog-confirm').dialog({
    closeOnEscape: false,
    resizable: false,
    height: 'auto',
    width: 400,
    modal: true,
    buttons: {
      Save: saveChange,
      Cancel: cancelChange,
    },
    open: enterEvent,
  });
});
