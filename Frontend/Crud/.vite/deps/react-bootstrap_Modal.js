"use client";
import {
  CloseButton_default,
  Fade_default,
  addEventListener_default,
  canUseDOM_default,
  css_default,
  listen_default,
  ownerDocument,
  removeEventListener_default,
  transitionEnd,
  useCallbackRef,
  useEventCallback,
  useIsomorphicEffect_default,
  useMergedRefs_default,
  useMounted,
  usePrevious
} from "./chunk-XV34XUG5.js";
import "./chunk-O63ZRILJ.js";
import {
  divWithClassName_default
} from "./chunk-J46V42D3.js";
import "./chunk-P5M6HV2J.js";
import {
  require_react_dom
} from "./chunk-4ASWBRZ3.js";
import {
  require_jsx_runtime,
  useBootstrapPrefix,
  useIsRTL
} from "./chunk-FSUHIHHS.js";
import {
  require_classnames
} from "./chunk-AM63V5Q7.js";
import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/react-bootstrap/esm/Modal.js
var import_classnames6 = __toESM(require_classnames());

// node_modules/dom-helpers/esm/scrollbarSize.js
var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM_default) {
      var scrollDiv = document.createElement("div");
      scrollDiv.style.position = "absolute";
      scrollDiv.style.top = "-9999px";
      scrollDiv.style.width = "50px";
      scrollDiv.style.height = "50px";
      scrollDiv.style.overflow = "scroll";
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }
  return size;
}

// node_modules/@restart/hooks/esm/useUpdatedRef.js
var import_react = __toESM(require_react());
function useUpdatedRef(value) {
  const valueRef = (0, import_react.useRef)(value);
  valueRef.current = value;
  return valueRef;
}

// node_modules/@restart/hooks/esm/useWillUnmount.js
var import_react2 = __toESM(require_react());
function useWillUnmount(fn) {
  const onUnmount = useUpdatedRef(fn);
  (0, import_react2.useEffect)(() => () => onUnmount.current(), []);
}

// node_modules/react-bootstrap/esm/Modal.js
var React11 = __toESM(require_react());
var import_react10 = __toESM(require_react());

// node_modules/dom-helpers/esm/activeElement.js
function activeElement(doc) {
  if (doc === void 0) {
    doc = ownerDocument();
  }
  try {
    var active = doc.activeElement;
    if (!active || !active.nodeName)
      return null;
    return active;
  } catch (e) {
    return doc.body;
  }
}

// node_modules/dom-helpers/esm/contains.js
function contains(context, node) {
  if (context.contains)
    return context.contains(node);
  if (context.compareDocumentPosition)
    return context === node || !!(context.compareDocumentPosition(node) & 16);
}

// node_modules/@restart/ui/esm/Modal.js
var import_react8 = __toESM(require_react());
var React3 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@restart/ui/esm/DataKey.js
var ATTRIBUTE_PREFIX = `data-rr-ui-`;
function dataAttr(property) {
  return `${ATTRIBUTE_PREFIX}${property}`;
}

// node_modules/@restart/ui/esm/getScrollbarWidth.js
function getBodyScrollbarWidth(ownerDocument2 = document) {
  const window2 = ownerDocument2.defaultView;
  return Math.abs(window2.innerWidth - ownerDocument2.documentElement.clientWidth);
}

// node_modules/@restart/ui/esm/ModalManager.js
var OPEN_DATA_ATTRIBUTE = dataAttr("modal-open");
var ModalManager = class {
  constructor({
    ownerDocument: ownerDocument2,
    handleContainerOverflow = true,
    isRTL = false
  } = {}) {
    this.handleContainerOverflow = handleContainerOverflow;
    this.isRTL = isRTL;
    this.modals = [];
    this.ownerDocument = ownerDocument2;
  }
  getScrollbarWidth() {
    return getBodyScrollbarWidth(this.ownerDocument);
  }
  getElement() {
    return (this.ownerDocument || document).body;
  }
  setModalAttributes(_modal) {
  }
  removeModalAttributes(_modal) {
  }
  setContainerStyle(containerState) {
    const style = {
      overflow: "hidden"
    };
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const container = this.getElement();
    containerState.style = {
      overflow: container.style.overflow,
      [paddingProp]: container.style[paddingProp]
    };
    if (containerState.scrollBarWidth) {
      style[paddingProp] = `${parseInt(css_default(container, paddingProp) || "0", 10) + containerState.scrollBarWidth}px`;
    }
    container.setAttribute(OPEN_DATA_ATTRIBUTE, "");
    css_default(container, style);
  }
  reset() {
    [...this.modals].forEach((m) => this.remove(m));
  }
  removeContainerStyle(containerState) {
    const container = this.getElement();
    container.removeAttribute(OPEN_DATA_ATTRIBUTE);
    Object.assign(container.style, containerState.style);
  }
  add(modal) {
    let modalIdx = this.modals.indexOf(modal);
    if (modalIdx !== -1) {
      return modalIdx;
    }
    modalIdx = this.modals.length;
    this.modals.push(modal);
    this.setModalAttributes(modal);
    if (modalIdx !== 0) {
      return modalIdx;
    }
    this.state = {
      scrollBarWidth: this.getScrollbarWidth(),
      style: {}
    };
    if (this.handleContainerOverflow) {
      this.setContainerStyle(this.state);
    }
    return modalIdx;
  }
  remove(modal) {
    const modalIdx = this.modals.indexOf(modal);
    if (modalIdx === -1) {
      return;
    }
    this.modals.splice(modalIdx, 1);
    if (!this.modals.length && this.handleContainerOverflow) {
      this.removeContainerStyle(this.state);
    }
    this.removeModalAttributes(modal);
  }
  isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
};
var ModalManager_default = ModalManager;

// node_modules/@restart/ui/esm/useWaitForDOMRef.js
var import_react4 = __toESM(require_react());

// node_modules/@restart/ui/esm/useWindow.js
var import_react3 = __toESM(require_react());
var Context = (0, import_react3.createContext)(canUseDOM_default ? window : void 0);
var WindowProvider = Context.Provider;
function useWindow() {
  return (0, import_react3.useContext)(Context);
}

// node_modules/@restart/ui/esm/useWaitForDOMRef.js
var resolveContainerRef = (ref, document2) => {
  if (!canUseDOM_default)
    return null;
  if (ref == null)
    return (document2 || ownerDocument()).body;
  if (typeof ref === "function")
    ref = ref();
  if (ref && "current" in ref)
    ref = ref.current;
  if (ref && ("nodeType" in ref || ref.getBoundingClientRect))
    return ref;
  return null;
};
function useWaitForDOMRef(ref, onResolved) {
  const window2 = useWindow();
  const [resolvedRef, setRef] = (0, import_react4.useState)(() => resolveContainerRef(ref, window2 == null ? void 0 : window2.document));
  if (!resolvedRef) {
    const earlyRef = resolveContainerRef(ref);
    if (earlyRef)
      setRef(earlyRef);
  }
  (0, import_react4.useEffect)(() => {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  (0, import_react4.useEffect)(() => {
    const nextRef = resolveContainerRef(ref);
    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}

// node_modules/@restart/ui/esm/ImperativeTransition.js
var import_react7 = __toESM(require_react());

// node_modules/@restart/ui/esm/NoopTransition.js
var import_react5 = __toESM(require_react());
function NoopTransition({
  children,
  in: inProp,
  onExited,
  mountOnEnter,
  unmountOnExit
}) {
  const ref = (0, import_react5.useRef)(null);
  const hasEnteredRef = (0, import_react5.useRef)(inProp);
  const handleExited = useEventCallback(onExited);
  (0, import_react5.useEffect)(() => {
    if (inProp)
      hasEnteredRef.current = true;
    else {
      handleExited(ref.current);
    }
  }, [inProp, handleExited]);
  const combinedRef = useMergedRefs_default(ref, children.ref);
  const child = (0, import_react5.cloneElement)(children, {
    ref: combinedRef
  });
  if (inProp)
    return child;
  if (unmountOnExit) {
    return null;
  }
  if (!hasEnteredRef.current && mountOnEnter) {
    return null;
  }
  return child;
}
var NoopTransition_default = NoopTransition;

// node_modules/@restart/ui/esm/RTGTransition.js
var React = __toESM(require_react());

// node_modules/@restart/ui/esm/useRTGTransitionProps.js
var import_react6 = __toESM(require_react());
var _excluded = ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "addEndListener", "children"];
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function useRTGTransitionProps(_ref) {
  let {
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    addEndListener,
    children
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const nodeRef = (0, import_react6.useRef)(null);
  const mergedRef = useMergedRefs_default(nodeRef, typeof children === "function" ? null : children.ref);
  const normalize = (callback) => (param) => {
    if (callback && nodeRef.current) {
      callback(nodeRef.current, param);
    }
  };
  const handleEnter = (0, import_react6.useCallback)(normalize(onEnter), [onEnter]);
  const handleEntering = (0, import_react6.useCallback)(normalize(onEntering), [onEntering]);
  const handleEntered = (0, import_react6.useCallback)(normalize(onEntered), [onEntered]);
  const handleExit = (0, import_react6.useCallback)(normalize(onExit), [onExit]);
  const handleExiting = (0, import_react6.useCallback)(normalize(onExiting), [onExiting]);
  const handleExited = (0, import_react6.useCallback)(normalize(onExited), [onExited]);
  const handleAddEndListener = (0, import_react6.useCallback)(normalize(addEndListener), [addEndListener]);
  return Object.assign({}, props, {
    nodeRef
  }, onEnter && {
    onEnter: handleEnter
  }, onEntering && {
    onEntering: handleEntering
  }, onEntered && {
    onEntered: handleEntered
  }, onExit && {
    onExit: handleExit
  }, onExiting && {
    onExiting: handleExiting
  }, onExited && {
    onExited: handleExited
  }, addEndListener && {
    addEndListener: handleAddEndListener
  }, {
    children: typeof children === "function" ? (status, innerProps) => (
      // TODO: Types for RTG missing innerProps, so need to cast.
      children(status, Object.assign({}, innerProps, {
        ref: mergedRef
      }))
    ) : (0, import_react6.cloneElement)(children, {
      ref: mergedRef
    })
  });
}

// node_modules/@restart/ui/esm/RTGTransition.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded2 = ["component"];
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var RTGTransition = React.forwardRef((_ref, ref) => {
  let {
    component: Component
  } = _ref, props = _objectWithoutPropertiesLoose2(_ref, _excluded2);
  const transitionProps = useRTGTransitionProps(props);
  return (0, import_jsx_runtime.jsx)(Component, Object.assign({
    ref
  }, transitionProps));
});
var RTGTransition_default = RTGTransition;

// node_modules/@restart/ui/esm/ImperativeTransition.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
function useTransition({
  in: inProp,
  onTransition
}) {
  const ref = (0, import_react7.useRef)(null);
  const isInitialRef = (0, import_react7.useRef)(true);
  const handleTransition = useEventCallback(onTransition);
  useIsomorphicEffect_default(() => {
    if (!ref.current) {
      return void 0;
    }
    let stale = false;
    handleTransition({
      in: inProp,
      element: ref.current,
      initial: isInitialRef.current,
      isStale: () => stale
    });
    return () => {
      stale = true;
    };
  }, [inProp, handleTransition]);
  useIsomorphicEffect_default(() => {
    isInitialRef.current = false;
    return () => {
      isInitialRef.current = true;
    };
  }, []);
  return ref;
}
function ImperativeTransition({
  children,
  in: inProp,
  onExited,
  onEntered,
  transition
}) {
  const [exited, setExited] = (0, import_react7.useState)(!inProp);
  if (inProp && exited) {
    setExited(false);
  }
  const ref = useTransition({
    in: !!inProp,
    onTransition: (options) => {
      const onFinish = () => {
        if (options.isStale())
          return;
        if (options.in) {
          onEntered == null ? void 0 : onEntered(options.element, options.initial);
        } else {
          setExited(true);
          onExited == null ? void 0 : onExited(options.element);
        }
      };
      Promise.resolve(transition(options)).then(onFinish, (error) => {
        if (!options.in)
          setExited(true);
        throw error;
      });
    }
  });
  const combinedRef = useMergedRefs_default(ref, children.ref);
  return exited && !inProp ? null : (0, import_react7.cloneElement)(children, {
    ref: combinedRef
  });
}
function renderTransition(component, runTransition, props) {
  if (component) {
    return (0, import_jsx_runtime2.jsx)(RTGTransition_default, Object.assign({}, props, {
      component
    }));
  }
  if (runTransition) {
    return (0, import_jsx_runtime2.jsx)(ImperativeTransition, Object.assign({}, props, {
      transition: runTransition
    }));
  }
  return (0, import_jsx_runtime2.jsx)(NoopTransition_default, Object.assign({}, props));
}

// node_modules/@restart/ui/esm/utils.js
function isEscKey(e) {
  return e.code === "Escape" || e.keyCode === 27;
}

// node_modules/@restart/ui/esm/Modal.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var _excluded3 = ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "runTransition", "backdropTransition", "runBackdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"];
function _objectWithoutPropertiesLoose3(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var manager;
function getManager(window2) {
  if (!manager)
    manager = new ModalManager_default({
      ownerDocument: window2 == null ? void 0 : window2.document
    });
  return manager;
}
function useModalManager(provided) {
  const window2 = useWindow();
  const modalManager = provided || getManager(window2);
  const modal = (0, import_react8.useRef)({
    dialog: null,
    backdrop: null
  });
  return Object.assign(modal.current, {
    add: () => modalManager.add(modal.current),
    remove: () => modalManager.remove(modal.current),
    isTopModal: () => modalManager.isTopModal(modal.current),
    setDialogRef: (0, import_react8.useCallback)((ref) => {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0, import_react8.useCallback)((ref) => {
      modal.current.backdrop = ref;
    }, [])
  });
}
var Modal = (0, import_react8.forwardRef)((_ref, ref) => {
  let {
    show = false,
    role = "dialog",
    className,
    style,
    children,
    backdrop = true,
    keyboard = true,
    onBackdropClick,
    onEscapeKeyDown,
    transition,
    runTransition,
    backdropTransition,
    runBackdropTransition,
    autoFocus = true,
    enforceFocus = true,
    restoreFocus = true,
    restoreFocusOptions,
    renderDialog,
    renderBackdrop = (props) => (0, import_jsx_runtime3.jsx)("div", Object.assign({}, props)),
    manager: providedManager,
    container: containerRef,
    onShow,
    onHide = () => {
    },
    onExit,
    onExited,
    onExiting,
    onEnter,
    onEntering,
    onEntered
  } = _ref, rest = _objectWithoutPropertiesLoose3(_ref, _excluded3);
  const ownerWindow = useWindow();
  const container = useWaitForDOMRef(containerRef);
  const modal = useModalManager(providedManager);
  const isMounted = useMounted();
  const prevShow = usePrevious(show);
  const [exited, setExited] = (0, import_react8.useState)(!show);
  const lastFocusRef = (0, import_react8.useRef)(null);
  (0, import_react8.useImperativeHandle)(ref, () => modal, [modal]);
  if (canUseDOM_default && !prevShow && show) {
    lastFocusRef.current = activeElement(ownerWindow == null ? void 0 : ownerWindow.document);
  }
  if (show && exited) {
    setExited(false);
  }
  const handleShow = useEventCallback(() => {
    modal.add();
    removeKeydownListenerRef.current = listen_default(document, "keydown", handleDocumentKeyDown);
    removeFocusListenerRef.current = listen_default(
      document,
      "focus",
      // the timeout is necessary b/c this will run before the new modal is mounted
      // and so steals focus from it
      () => setTimeout(handleEnforceFocus),
      true
    );
    if (onShow) {
      onShow();
    }
    if (autoFocus) {
      var _modal$dialog$ownerDo, _modal$dialog;
      const currentActiveElement = activeElement((_modal$dialog$ownerDo = (_modal$dialog = modal.dialog) == null ? void 0 : _modal$dialog.ownerDocument) != null ? _modal$dialog$ownerDo : ownerWindow == null ? void 0 : ownerWindow.document);
      if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
        lastFocusRef.current = currentActiveElement;
        modal.dialog.focus();
      }
    }
  });
  const handleHide = useEventCallback(() => {
    modal.remove();
    removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
    removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();
    if (restoreFocus) {
      var _lastFocusRef$current;
      (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
      lastFocusRef.current = null;
    }
  });
  (0, import_react8.useEffect)(() => {
    if (!show || !container)
      return;
    handleShow();
  }, [
    show,
    container,
    /* should never change: */
    handleShow
  ]);
  (0, import_react8.useEffect)(() => {
    if (!exited)
      return;
    handleHide();
  }, [exited, handleHide]);
  useWillUnmount(() => {
    handleHide();
  });
  const handleEnforceFocus = useEventCallback(() => {
    if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }
    const currentActiveElement = activeElement(ownerWindow == null ? void 0 : ownerWindow.document);
    if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  });
  const handleBackdropClick = useEventCallback((e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onBackdropClick == null ? void 0 : onBackdropClick(e);
    if (backdrop === true) {
      onHide();
    }
  });
  const handleDocumentKeyDown = useEventCallback((e) => {
    if (keyboard && isEscKey(e) && modal.isTopModal()) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
      if (!e.defaultPrevented) {
        onHide();
      }
    }
  });
  const removeFocusListenerRef = (0, import_react8.useRef)();
  const removeKeydownListenerRef = (0, import_react8.useRef)();
  const handleHidden = (...args) => {
    setExited(true);
    onExited == null ? void 0 : onExited(...args);
  };
  if (!container) {
    return null;
  }
  const dialogProps = Object.assign({
    role,
    ref: modal.setDialogRef,
    // apparently only works on the dialog role element
    "aria-modal": role === "dialog" ? true : void 0
  }, rest, {
    style,
    className,
    tabIndex: -1
  });
  let dialog = renderDialog ? renderDialog(dialogProps) : (0, import_jsx_runtime3.jsx)("div", Object.assign({}, dialogProps, {
    children: React3.cloneElement(children, {
      role: "document"
    })
  }));
  dialog = renderTransition(transition, runTransition, {
    unmountOnExit: true,
    mountOnEnter: true,
    appear: true,
    in: !!show,
    onExit,
    onExiting,
    onExited: handleHidden,
    onEnter,
    onEntering,
    onEntered,
    children: dialog
  });
  let backdropElement = null;
  if (backdrop) {
    backdropElement = renderBackdrop({
      ref: modal.setBackdropRef,
      onClick: handleBackdropClick
    });
    backdropElement = renderTransition(backdropTransition, runBackdropTransition, {
      in: !!show,
      appear: true,
      mountOnEnter: true,
      unmountOnExit: true,
      children: backdropElement
    });
  }
  return (0, import_jsx_runtime3.jsx)(import_jsx_runtime4.Fragment, {
    children: import_react_dom.default.createPortal((0, import_jsx_runtime5.jsxs)(import_jsx_runtime4.Fragment, {
      children: [backdropElement, dialog]
    }), container)
  });
});
Modal.displayName = "Modal";
var Modal_default = Object.assign(Modal, {
  Manager: ModalManager_default
});

// node_modules/dom-helpers/esm/hasClass.js
function hasClass(element, className) {
  if (element.classList)
    return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

// node_modules/dom-helpers/esm/addClass.js
function addClass(element, className) {
  if (element.classList)
    element.classList.add(className);
  else if (!hasClass(element, className))
    if (typeof element.className === "string")
      element.className = element.className + " " + className;
    else
      element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}

// node_modules/dom-helpers/esm/querySelectorAll.js
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}

// node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === "string") {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
  }
}

// node_modules/react-bootstrap/esm/BootstrapModalManager.js
var Selector = {
  FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
  STICKY_CONTENT: ".sticky-top",
  NAVBAR_TOGGLER: ".navbar-toggler"
};
var BootstrapModalManager = class extends ModalManager_default {
  adjustAndStore(prop, element, adjust) {
    const actual = element.style[prop];
    element.dataset[prop] = actual;
    css_default(element, {
      [prop]: `${parseFloat(css_default(element, prop)) + adjust}px`
    });
  }
  restore(prop, element) {
    const value = element.dataset[prop];
    if (value !== void 0) {
      delete element.dataset[prop];
      css_default(element, {
        [prop]: value
      });
    }
  }
  setContainerStyle(containerState) {
    super.setContainerStyle(containerState);
    const container = this.getElement();
    addClass(container, "modal-open");
    if (!containerState.scrollBarWidth)
      return;
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const marginProp = this.isRTL ? "marginLeft" : "marginRight";
    qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth));
    qsa(container, Selector.STICKY_CONTENT).forEach((el) => this.adjustAndStore(marginProp, el, -containerState.scrollBarWidth));
    qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.adjustAndStore(marginProp, el, containerState.scrollBarWidth));
  }
  removeContainerStyle(containerState) {
    super.removeContainerStyle(containerState);
    const container = this.getElement();
    removeClass(container, "modal-open");
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const marginProp = this.isRTL ? "marginLeft" : "marginRight";
    qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.restore(paddingProp, el));
    qsa(container, Selector.STICKY_CONTENT).forEach((el) => this.restore(marginProp, el));
    qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.restore(marginProp, el));
  }
};
var sharedManager;
function getSharedManager(options) {
  if (!sharedManager)
    sharedManager = new BootstrapModalManager(options);
  return sharedManager;
}

// node_modules/react-bootstrap/esm/ModalBody.js
var React4 = __toESM(require_react());
var import_classnames = __toESM(require_classnames());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var ModalBody = React4.forwardRef(({
  className,
  bsPrefix,
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-body");
  return (0, import_jsx_runtime6.jsx)(Component, {
    ref,
    className: (0, import_classnames.default)(className, bsPrefix),
    ...props
  });
});
ModalBody.displayName = "ModalBody";
var ModalBody_default = ModalBody;

// node_modules/react-bootstrap/esm/ModalContext.js
var React5 = __toESM(require_react());
var ModalContext = React5.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide() {
  }
});
var ModalContext_default = ModalContext;

// node_modules/react-bootstrap/esm/ModalDialog.js
var import_classnames2 = __toESM(require_classnames());
var React6 = __toESM(require_react());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var ModalDialog = React6.forwardRef(({
  bsPrefix,
  className,
  contentClassName,
  centered,
  size: size2,
  fullscreen,
  children,
  scrollable,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
  const dialogClass = `${bsPrefix}-dialog`;
  const fullScreenClass = typeof fullscreen === "string" ? `${bsPrefix}-fullscreen-${fullscreen}` : `${bsPrefix}-fullscreen`;
  return (0, import_jsx_runtime7.jsx)("div", {
    ...props,
    ref,
    className: (0, import_classnames2.default)(dialogClass, className, size2 && `${bsPrefix}-${size2}`, centered && `${dialogClass}-centered`, scrollable && `${dialogClass}-scrollable`, fullscreen && fullScreenClass),
    children: (0, import_jsx_runtime7.jsx)("div", {
      className: (0, import_classnames2.default)(`${bsPrefix}-content`, contentClassName),
      children
    })
  });
});
ModalDialog.displayName = "ModalDialog";
var ModalDialog_default = ModalDialog;

// node_modules/react-bootstrap/esm/ModalFooter.js
var React7 = __toESM(require_react());
var import_classnames3 = __toESM(require_classnames());
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var ModalFooter = React7.forwardRef(({
  className,
  bsPrefix,
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-footer");
  return (0, import_jsx_runtime8.jsx)(Component, {
    ref,
    className: (0, import_classnames3.default)(className, bsPrefix),
    ...props
  });
});
ModalFooter.displayName = "ModalFooter";
var ModalFooter_default = ModalFooter;

// node_modules/react-bootstrap/esm/ModalHeader.js
var import_classnames4 = __toESM(require_classnames());
var React9 = __toESM(require_react());

// node_modules/react-bootstrap/esm/AbstractModalHeader.js
var React8 = __toESM(require_react());
var import_react9 = __toESM(require_react());
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var AbstractModalHeader = React8.forwardRef(({
  closeLabel = "Close",
  closeVariant,
  closeButton = false,
  onHide,
  children,
  ...props
}, ref) => {
  const context = (0, import_react9.useContext)(ModalContext_default);
  const handleClick = useEventCallback(() => {
    context == null ? void 0 : context.onHide();
    onHide == null ? void 0 : onHide();
  });
  return (0, import_jsx_runtime10.jsxs)("div", {
    ref,
    ...props,
    children: [children, closeButton && (0, import_jsx_runtime9.jsx)(CloseButton_default, {
      "aria-label": closeLabel,
      variant: closeVariant,
      onClick: handleClick
    })]
  });
});
var AbstractModalHeader_default = AbstractModalHeader;

// node_modules/react-bootstrap/esm/ModalHeader.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var ModalHeader = React9.forwardRef(({
  bsPrefix,
  className,
  closeLabel = "Close",
  closeButton = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-header");
  return (0, import_jsx_runtime11.jsx)(AbstractModalHeader_default, {
    ref,
    ...props,
    className: (0, import_classnames4.default)(className, bsPrefix),
    closeLabel,
    closeButton
  });
});
ModalHeader.displayName = "ModalHeader";
var ModalHeader_default = ModalHeader;

// node_modules/react-bootstrap/esm/ModalTitle.js
var React10 = __toESM(require_react());
var import_classnames5 = __toESM(require_classnames());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var DivStyledAsH4 = divWithClassName_default("h4");
var ModalTitle = React10.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-title");
  return (0, import_jsx_runtime12.jsx)(Component, {
    ref,
    className: (0, import_classnames5.default)(className, bsPrefix),
    ...props
  });
});
ModalTitle.displayName = "ModalTitle";
var ModalTitle_default = ModalTitle;

// node_modules/react-bootstrap/esm/Modal.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
function DialogTransition(props) {
  return (0, import_jsx_runtime13.jsx)(Fade_default, {
    ...props,
    timeout: null
  });
}
function BackdropTransition(props) {
  return (0, import_jsx_runtime13.jsx)(Fade_default, {
    ...props,
    timeout: null
  });
}
var Modal2 = React11.forwardRef(({
  bsPrefix,
  className,
  style,
  dialogClassName,
  contentClassName,
  children,
  dialogAs: Dialog = ModalDialog_default,
  "data-bs-theme": dataBsTheme,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-label": ariaLabel,
  /* BaseModal props */
  show = false,
  animation = true,
  backdrop = true,
  keyboard = true,
  onEscapeKeyDown,
  onShow,
  onHide,
  container,
  autoFocus = true,
  enforceFocus = true,
  restoreFocus = true,
  restoreFocusOptions,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  backdropClassName,
  manager: propsManager,
  ...props
}, ref) => {
  const [modalStyle, setStyle] = (0, import_react10.useState)({});
  const [animateStaticModal, setAnimateStaticModal] = (0, import_react10.useState)(false);
  const waitingForMouseUpRef = (0, import_react10.useRef)(false);
  const ignoreBackdropClickRef = (0, import_react10.useRef)(false);
  const removeStaticModalAnimationRef = (0, import_react10.useRef)(null);
  const [modal, setModalRef] = useCallbackRef();
  const mergedRef = useMergedRefs_default(ref, setModalRef);
  const handleHide = useEventCallback(onHide);
  const isRTL = useIsRTL();
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
  const modalContext = (0, import_react10.useMemo)(() => ({
    onHide: handleHide
  }), [handleHide]);
  function getModalManager() {
    if (propsManager)
      return propsManager;
    return getSharedManager({
      isRTL
    });
  }
  function updateDialogStyle(node) {
    if (!canUseDOM_default)
      return;
    const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
    const modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
    setStyle({
      paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : void 0,
      paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : void 0
    });
  }
  const handleWindowResize = useEventCallback(() => {
    if (modal) {
      updateDialogStyle(modal.dialog);
    }
  });
  useWillUnmount(() => {
    removeEventListener_default(window, "resize", handleWindowResize);
    removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
  });
  const handleDialogMouseDown = () => {
    waitingForMouseUpRef.current = true;
  };
  const handleMouseUp = (e) => {
    if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
      ignoreBackdropClickRef.current = true;
    }
    waitingForMouseUpRef.current = false;
  };
  const handleStaticModalAnimation = () => {
    setAnimateStaticModal(true);
    removeStaticModalAnimationRef.current = transitionEnd(modal.dialog, () => {
      setAnimateStaticModal(false);
    });
  };
  const handleStaticBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    handleStaticModalAnimation();
  };
  const handleClick = (e) => {
    if (backdrop === "static") {
      handleStaticBackdropClick(e);
      return;
    }
    if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
      ignoreBackdropClickRef.current = false;
      return;
    }
    onHide == null ? void 0 : onHide();
  };
  const handleEscapeKeyDown = (e) => {
    if (keyboard) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
    } else {
      e.preventDefault();
      if (backdrop === "static") {
        handleStaticModalAnimation();
      }
    }
  };
  const handleEnter = (node, isAppearing) => {
    if (node) {
      updateDialogStyle(node);
    }
    onEnter == null ? void 0 : onEnter(node, isAppearing);
  };
  const handleExit = (node) => {
    removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
    onExit == null ? void 0 : onExit(node);
  };
  const handleEntering = (node, isAppearing) => {
    onEntering == null ? void 0 : onEntering(node, isAppearing);
    addEventListener_default(window, "resize", handleWindowResize);
  };
  const handleExited = (node) => {
    if (node)
      node.style.display = "";
    onExited == null ? void 0 : onExited(node);
    removeEventListener_default(window, "resize", handleWindowResize);
  };
  const renderBackdrop = (0, import_react10.useCallback)((backdropProps) => (0, import_jsx_runtime13.jsx)("div", {
    ...backdropProps,
    className: (0, import_classnames6.default)(`${bsPrefix}-backdrop`, backdropClassName, !animation && "show")
  }), [animation, backdropClassName, bsPrefix]);
  const baseModalStyle = {
    ...style,
    ...modalStyle
  };
  baseModalStyle.display = "block";
  const renderDialog = (dialogProps) => (0, import_jsx_runtime13.jsx)("div", {
    role: "dialog",
    ...dialogProps,
    style: baseModalStyle,
    className: (0, import_classnames6.default)(className, bsPrefix, animateStaticModal && `${bsPrefix}-static`, !animation && "show"),
    onClick: backdrop ? handleClick : void 0,
    onMouseUp: handleMouseUp,
    "data-bs-theme": dataBsTheme,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    children: (0, import_jsx_runtime13.jsx)(Dialog, {
      ...props,
      onMouseDown: handleDialogMouseDown,
      className: dialogClassName,
      contentClassName,
      children
    })
  });
  return (0, import_jsx_runtime13.jsx)(ModalContext_default.Provider, {
    value: modalContext,
    children: (0, import_jsx_runtime13.jsx)(Modal_default, {
      show,
      ref: mergedRef,
      backdrop,
      container,
      keyboard: true,
      autoFocus,
      enforceFocus,
      restoreFocus,
      restoreFocusOptions,
      onEscapeKeyDown: handleEscapeKeyDown,
      onShow,
      onHide,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered,
      onExit: handleExit,
      onExiting,
      onExited: handleExited,
      manager: getModalManager(),
      transition: animation ? DialogTransition : void 0,
      backdropTransition: animation ? BackdropTransition : void 0,
      renderBackdrop,
      renderDialog
    })
  });
});
Modal2.displayName = "Modal";
var Modal_default2 = Object.assign(Modal2, {
  Body: ModalBody_default,
  Header: ModalHeader_default,
  Title: ModalTitle_default,
  Footer: ModalFooter_default,
  Dialog: ModalDialog_default,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150
});
export {
  Modal_default2 as default
};
//# sourceMappingURL=react-bootstrap_Modal.js.map
