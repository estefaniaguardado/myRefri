/* global $ */

$('button#deleteItemButton').click(() => {
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


$('button#modifyItemButton').click((event) => {
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
      success: () => {
        currentCellNameItem.replaceWith(`<td>${newNameItem}</td>`);
        $(this).dialog('close');
      },
    });
  }

  function cancelChange() {
    $(this).dialog('close');
  }

  $('#dialog-confirm').dialog({
    resizable: false,
    height: 'auto',
    width: 400,
    modal: true,
    buttons: {
      'Save Changes': saveChange,
      Cancel: cancelChange,
    },
  });
});
