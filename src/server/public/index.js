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

function setUnitySelect(unities) {
  unities.forEach((unit) => {
    $('select#unitySelect').append($('<option>', {
      selected: false,
      value: unit,
      text: unit,
    }));
  });

  $('select#unitySelect option:eq(0)').prop('selected', true);
  setQuantityInput($('select#unitySelect'));
  $('li#unity').show();
  $('li#quantity').show();
  $('li#submitNewItem').show();
}

$('select#selectProducts').change(function createUnitiesSelect() {
  const hasPreviousOptions = $('select#unitySelect').children('option').length > 0;

  if (hasPreviousOptions) {
    $('select#unitySelect option').remove();
  }

  const selectedOption = $(this).find(':selected').val();

  $.ajax({
    headers: { accept: 'application/json' },
    url: `/products/${selectedOption}`,
    type: 'GET',
    success: (data) => {
      setUnitySelect(data.unities);
    },
  });
});

$('select#unitySelect').change(function createQuantityInput() {
  setQuantityInput($(this));
  $('li#quantity').show();
});

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
    url: `/item/${this.value}`,
    type: 'DELETE',
    success() {
      $tr.remove();
    },
  });
});

function getDetailsItembyId(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      headers: { accept: 'application/json' },
      type: 'GET',
      url: `/item/${id}`,
    })
      .done(data => resolve(data))
      .fail(error => reject(error));
  });
}

function getDetailsProductItemById(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      headers: { accept: 'application/json' },
      type: 'GET',
      url: `/products/${id}`,
    })
      .done(data => resolve(data))
      .fail(error => reject(error));
  });
}

function setItemUnitySelect(item, product) {
  const hasPreviousOptions = $('select#itemUnitySelect').children('option').length > 0;

  if (hasPreviousOptions) {
    $('select#itemUnitySelect option').remove();
  }

  product.unities.forEach((unit) => {
    let isSelected;

    if (item.unity !== unit) {
      isSelected = false;
    } else {
      isSelected = true;
    }

    $('select#itemUnitySelect').append($('<option>', {
      selected: isSelected,
      value: unit,
      text: unit,
    }));
  });
}

function setItemQuantityInput(selectedUnity) {
  if (selectedUnity === 'gr' || selectedUnity === 'mL') {
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

$('button#modifyItemButton').click(async function modifyHandler(event) {
  event.preventDefault();

  const idItemSelected = $(this).closest('tr').attr('id');
  const item = (await getDetailsItembyId(idItemSelected)).result;
  const product = await getDetailsProductItemById(item.product.id);

  $('#modifyItemP').text(item.product.names[0]);
  setItemUnitySelect(item, product);
  setItemQuantityInput(item.unity);

  function saveChange(modalEvent) {
    modalEvent.preventDefault();

    const unityItem = $('select#itemUnitySelect').find(':selected').val();
    const quantityItem = $('input#itemQuantityInput').val();
    $.ajax({
      headers: { accept: 'application/json' },
      type: 'PUT',
      url: `/item/${idItemSelected}`,
      data: { unityItem, quantityItem },
      success: function successUpdate() {
        $('#dialog-confirm').dialog('close');
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
