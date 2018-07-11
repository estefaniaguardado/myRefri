/* global $ */
function setQuantityInput(unitySelect) {
  const selectedOption = $(unitySelect).find(':selected').val();

  if (selectedOption === 'gr' || selectedOption === 'mL') {
    $('input#quantityInput').attr('value', 50);
    $('input#quantityInput').attr('step', 50);
    $('input#quantityInput').attr('max', 100000);
    $('input#quantityInput').attr('min', 50);
  } else {
    $('input#quantityInput').attr('value', 1);
    $('input#quantityInput').attr('step', 1);
    $('input#quantityInput').attr('max', 100);
    $('input#quantityInput').attr('min', 1);
  }
}

$('select#selectProducts').change(function createUnitiesSelect() {
  const hasPreviousOptions = $('select#unitySelect').children('option').length > 0;

  if (hasPreviousOptions) {
    $('select#unitySelect option').remove();
  }

  const selectedOption = JSON.parse($(this).find(':selected').val());

  (selectedOption.unities).forEach((unit) => {
    $('select#unitySelect').append($('<option>', {
      selected: false,
      value: unit,
      text: unit,
    }));
  });
  $('select#unitySelect option:eq(0)').prop('selected', true);
  setQuantityInput($('select#unitySelect'));
  $('td#unity').show();
  $('td#quantity').show();
  $('td#submitNewItem').show();
});

$('select#unitySelect').change(function createQuantityInput() {
  setQuantityInput($(this));
  $('td#quantity').show();
});

$('button#deleteItemButton').click(function deleteHandler() {
  const $tr = $(this).closest('tr');
  $.ajax({
    headers: { accept: 'application/json' },
    url: `/item/${this.value}`,
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
      url: `/item/${idItemSelected}`,
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
