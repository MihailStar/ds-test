window.addEventListener("load", () => {
  const $form = document.querySelector<HTMLFormElement>(
    ".ask-question-page__form form"
  )!;
  const $inputs = Array.from($form.querySelectorAll<HTMLInputElement>("input"));
  const $button = $form.querySelector<HTMLButtonElement>(
    'button[type="submit"]'
  );

  $form.setAttribute("novalidate", "novalidate");
  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    const $invalidInputs: HTMLInputElement[] = [];

    $inputs.forEach(($input) => {
      const $oldErrorMessage = $input.nextElementSibling;

      if ($input.checkValidity()) {
        if ($oldErrorMessage !== null) {
          $oldErrorMessage.remove();
        }
        return;
      }

      if ($oldErrorMessage !== null) {
        $invalidInputs.push($input);
        return;
      }

      const $errorMessage = document.createElement("p");
      $errorMessage.className = "form__message form__message_about-error";
      $errorMessage.textContent =
        $input.dataset.errorMessage ?? "Заполните это поле";

      $input.after($errorMessage);
      $invalidInputs.push($input);
    });

    if ($invalidInputs[0] !== undefined) {
      $invalidInputs[0].focus();
      return;
    }

    // $form.submit();

    const $statusMessage = document.createElement("p");
    $statusMessage.className = "form__message";
    $statusMessage.hidden = true;

    $form.append($statusMessage);

    if ($button !== null) {
      $button.disabled = true;
    }

    fetch($form.action, {
      method: "POST",
      body: new FormData($form),
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Что-то пошло не так. Попробуйте позднее");
        }

        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== true) {
          throw new Error(data.text ?? data);
        }

        $statusMessage.classList.add("form__message_about-success");
        $statusMessage.textContent = data.text ?? data;
        $statusMessage.hidden = false;
      })
      .catch((error) => {
        $statusMessage.classList.add("form__message_about-error");
        $statusMessage.textContent = error.message ?? error;
        $statusMessage.hidden = false;
      })
      .finally(() => {
        if ($button !== null) {
          setTimeout(() => {
            $button.disabled = false;
          }, 3000);
        }

        setTimeout(() => {
          $statusMessage.remove();
          $form.reset();
        }, 3000);
      });
  });
});
