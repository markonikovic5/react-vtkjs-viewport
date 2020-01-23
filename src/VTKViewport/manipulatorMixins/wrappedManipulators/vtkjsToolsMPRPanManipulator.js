import macro from 'vtk.js/Sources/macro';
import vtkMouseCameraTrackballPanManipulator from 'vtk.js/Sources/Interaction/Manipulators/MouseCameraTrackballPanManipulator';
import dispatchEvent from '../../../helpers/dispatchEvent.js';
import EVENTS from '../../../events';

function vtkjsToolsMPRPanManipulator(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkjsToolsMPRPanManipulator');

  const superOnButtonDown = publicAPI.onButtonDown;
  publicAPI.onButtonDown = (interactor, renderer, position) => {
    superOnButtonDown(interactor, renderer, position);

    if (!model.viewportData) {
      return;
    }

    const eventWindow = model.viewportData.getEventWindow();

    console.log('PAN MOUSE DOWN');

    dispatchEvent(eventWindow, EVENTS.MOUSE_DOWN, { position });
  };

  const superOnMouseMove = publicAPI.onMouseMove;
  publicAPI.onMouseMove = (interactor, renderer, position) => {
    superOnMouseMove(interactor, renderer, position);

    console.log('PAN DRAG');

    // TODO -> How do we deal with other states that may do pan? Should that ever happen?
    const eventWindow = model.viewportData.getEventWindow();

    dispatchEvent(eventWindow, EVENTS.PAN_DRAG, { position });
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  macro.obj(publicAPI, model);
  vtkMouseCameraTrackballPanManipulator.extend(publicAPI, model, initialValues);

  macro.setGet(publicAPI, model, ['viewportData']);

  // Object specific methods
  vtkjsToolsMPRPanManipulator(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(
  extend,
  'vtkjsToolsMPRPanManipulator'
);

export default Object.assign({ newInstance, extend });
