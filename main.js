var preloading = !1;
var allScripts = [];
var allFonts = [];
var isTouchDevice = 'ontouchstart'in window || navigator.msMaxTouchPoints;
var preloadRunned = !1;
var triggerDomEvent = n489D_vars.triggerDomEvent;
var delayOn = n489D_vars.delayOn;
var triggerElementor = n489D_vars.triggerElementor;
var scrollTriggered = !1;
setTimeout(function() {
    preload()
}, 30);
window.addEventListener('load', function() {
    mouseMoveFun()
});
var hasBannerScript = !1;
window.addEventListener('DOMContentLoaded', function() {
    function isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    }
    if (isSafari()) {
        var iframes = [].slice.call(document.querySelectorAll(".wpc-iframe-delay"));
        if (iframes.length > 0) {
            iframes.forEach(function(element, index) {
                var promise = new Promise(function(resolve, reject) {
                    var iframeUrl = element.getAttribute('data-wpc-src');
                    if (iframeUrl) {
                        element.setAttribute('src', iframeUrl);
                        element.removeAttribute('data-wpc-src');
                        element.classList.remove("wpc-iframe-delay");
                        element.addEventListener('load', ()=>{}
                        );
                        element.addEventListener('error', ()=>{}
                        )
                    }
                }
                )
            })
        }
    }
});
var foundAIO = !1;
var preloadingJS = !1;
function preload() {
    if (!preloading) {
        preloading = !0
    } else {
        return
    }
    var iframes = [].slice.call(document.querySelectorAll(".wpc-iframe-delay"));
    var styles = [].slice.call(document.querySelectorAll('[rel="wpc-stylesheet"],[type="wpc-stylesheet"]'));
    var mobileStyles = [].slice.call(document.querySelectorAll('[rel="wpc-mobile-stylesheet"],[type="wpc-mobile-stylesheet"]'));
    var customPromiseFlag = [];
    styles.forEach(function(element, index) {
        var promise = new Promise(function(resolve, reject) {
            if (element.tagName.toLowerCase() === 'link') {
                element.setAttribute('rel', 'stylesheet')
            }
            element.setAttribute('type', 'text/css');
            element.addEventListener('load', function() {
                resolve()
            });
            element.addEventListener('error', function() {
                reject()
            })
        }
        );
        customPromiseFlag.push(promise)
    });
    styles = [];
    iframes.forEach(function(element, index) {
        var promise = new Promise(function(resolve, reject) {
            var iframeUrl = element.getAttribute('data-wpc-src');
            if (iframeUrl) {
                element.setAttribute('src', iframeUrl);
                element.removeAttribute('data-wpc-src');
                element.classList.remove("wpc-iframe-delay");
                if (element.parentElement.tagName.toLowerCase() === "video") {
                    var newSource = document.createElement("source");
                    newSource.src = iframeUrl;
                    newSource.type = 'video/mp4';
                    var videoParent = element.parentElement;
                    videoParent.querySelectorAll("source").forEach(source=>source.remove());
                    videoParent.appendChild(newSource);
                    videoParent.load();
                    videoParent.play().catch(error=>{}
                    )
                }
                element.play().catch(error=>{}
                );
                element.addEventListener('load', ()=>{}
                );
                element.addEventListener('error', ()=>{}
                )
            }
        }
        );
        customPromiseFlag.push(promise)
    });
    iframes = [];
    mobileStyles.forEach(function(element, index) {
        var promise = new Promise(function(resolve, reject) {
            if (element.tagName.toLowerCase() === 'link') {
                element.setAttribute('rel', 'stylesheet')
            }
            element.setAttribute('type', 'text/css');
            element.addEventListener('load', function() {
                resolve()
            });
            element.addEventListener('error', function() {
                reject()
            })
        }
        );
        customPromiseFlag.push(promise)
    });
    mobileStyles = [];
    Promise.all(customPromiseFlag).then(function() {
        preloading = !1;
        iframes = [].slice.call(document.querySelectorAll(".wpc-iframe-delay"));
        styles = [].slice.call(document.querySelectorAll('[rel="wpc-stylesheet"],[type="wpc-stylesheet"]'));
        mobileStyles = [].slice.call(document.querySelectorAll('[rel="wpc-mobile-stylesheet"],[type="wpc-mobile-stylesheet"]'));
        if (iframes.length !== 0 || styles.length !== 0 || mobileStyles.length !== 0) {
            preload()
        }
        var criticalCss = document.querySelector('#wpc-critical-css');
        if (criticalCss) {
            criticalCss.remove()
        }
    }).catch(function() {
        styles.forEach(function(element, index) {
            if (element.tagName.toLowerCase() === 'link') {
                element.setAttribute('rel', 'stylesheet')
            }
            element.setAttribute('type', 'text/css')
        })
    })
}
function mouseMoveFun() {
    var preloadLinks = document.querySelectorAll('.wpc-preload-links');
    preloadLinks.forEach(function(link) {
        link.setAttribute('rel', 'preload');
        link.setAttribute('as', 'script')
    });
    window.removeEventListener('load', mouseMoveFun);
    allScripts = [].slice.call(document.querySelectorAll('script[type="wpc-delay-script"]')).filter(script=>!script.src?.includes('paykickstart')).filter(script=>!script.src?.includes('stripe')).filter(script=>!(/-before$|-after$|-extra$/).test(script.id));
    if (allScripts.length === 0) {
        document.dispatchEvent(new Event('WPCContentLoaded'))
    } else {
        hasBannerScript = allScripts.some(script=>{
            return script.src && script.src.includes('banner.js')
        }
        )
    }
    if (!foundAIO) {
        foundAIO = !0;
        var filteredScripts = allScripts.filter(function(script) {
            return !(/-before$|-after$|-extra$/).test(script.id) && script.id === "wpcompress-aio-js"
        });
        filteredScripts.forEach((script,index)=>{
            var newElement = document.createElement('script');
            newElement.setAttribute('type', 'text/javascript');
            newElement.setAttribute('id', 'wpcompress-aio-js');
            newElement.setAttribute('data-loaded', 'createdScript-aio');
            newElement.async = !1;
            newElement.setAttribute('src', script.getAttribute('src'));
            document.head.appendChild(newElement);
            script.remove()
        }
        );
        var scriptExtra = document.querySelector('script[id="wpcompress-aio-js-extra"]');
        if (scriptExtra) {
            var newElement = document.createElement('script');
            newElement.setAttribute('type', 'text/javascript');
            if (scriptExtra && typeof scriptExtra.id !== 'undefined') {
                newElement.setAttribute('id', scriptExtra.id)
            }
            newElement.setAttribute('data-loaded', 'createdScript-aio');
            newElement.textContent = scriptExtra.textContent;
            document.head.appendChild(newElement);
            scriptExtra.remove()
        }
        allScripts = [].slice.call(document.querySelectorAll('script[type="wpc-delay-script"]')).filter(function(script) {
            return !(/-before$|-after$|-extra$/).test(script.id)
        })
    }
    let stickyScriptsExist = allScripts.some(script=>script.src && script.src.includes('jquery.sticky'));
    if (stickyScriptsExist) {
        let jQueryIndex = -1;
        allScripts.forEach((script,index)=>{
            if (script.src && (script.src.includes('jquery.min.js') || script.src.includes('jquery.js') || script.src.includes('jquery-migrate'))) {
                const queryParamsIndex = script.src.indexOf('?');
                const scriptBaseURL = queryParamsIndex !== -1 ? script.src.substring(0, queryParamsIndex) : script.src;
                if (scriptBaseURL.endsWith('jquery.min.js') || scriptBaseURL.endsWith('jquery.js') || scriptBaseURL.endsWith('jquery-migrate')) {
                    jQueryIndex = index
                }
            }
        }
        );
        if (jQueryIndex !== -1) {
            let stickyScripts = allScripts.filter(script=>script.src && script.src.includes('jquery.sticky'));
            allScripts = allScripts.filter(script=>!(script.src && script.src.includes('jquery.sticky')));
            stickyScripts.forEach((stickyScript,index)=>{
                allScripts.splice(jQueryIndex + 1 + index, 0, stickyScript)
            }
            )
        }
    }
    const aFPreloader = document.getElementById('af-preloader');
    if (aFPreloader) {
        aFPreloader.remove()
    }
    if (allScripts.length > 0) {
        loadJs()
    }
}
if (isTouchDevice) {}
var loadJsRunning = !1;
var dispatchedEvents = !1;
function preloadJS() {
    if (preloadingJS) {
        return
    }
    preloadingJS = !0;
    allScripts.forEach(function(script) {
        if (script.src) {
            var preloadLink = document.createElement("link");
            preloadLink.rel = "preload";
            preloadLink.href = script.src;
            preloadLink.as = "script";
            preloadLink.crossOrigin = "anonymous";
            document.head.appendChild(preloadLink)
        }
    })
}
function loadJsNext() {
    if (allScripts.length === 0) {
        allScripts = [].slice.call(document.querySelectorAll('script[type="wpc-delay-script"]')).filter(function(script) {
            return !(/-before$|-after$|-extra$/).test(script.id)
        });
        const aFPreloader = document.getElementById('af-preloader');
        if (aFPreloader) {
            aFPreloader.remove()
        }
        if (allScripts.length > 0) {
            loadJs();
            return
        }
        if (!dispatchedEvents) {
            dispatchedEvents = !0;
            if (typeof triggerDomEvent !== 'undefined' && triggerDomEvent !== "false") {
                document.dispatchEvent(new Event("DOMContentLoaded"));
                window.dispatchEvent(new Event("resize"));
                window.dispatchEvent(new Event('load'))
            }
            if (wpcIntegrationActive === 'undefined') {
                document.dispatchEvent(new Event('WPCContentLoaded'))
            }
            if (typeof elementorFrontend !== 'undefined' && delayOn !== "false") {
                elementorFrontend.init()
            }
        }
        setTimeout(function() {
            var slider = document.getElementsByClassName('banner-image');
            if (slider !== null && slider.length !== 0 && slider !== undefined) {
                for (var i = 0; i < slider.length; i++) {
                    slider[i].style.display = 'block'
                }
            }
            var gForm = document.getElementsByClassName('gform_wrapper');
            if (gForm !== null && gForm.length !== 0 && gForm !== undefined) {
                for (var i = 0; i < gForm.length; i++) {
                    gForm[i].style.display = 'block'
                }
            }
        }, 300)
    } else {
        loadJs()
    }
}
function whereToAppend(originalElement, newElement) {
    var isInHead = !1;
    if (isInHead) {} else {
        document.body.appendChild(newElement)
    }
}
function loadFonts() {
    allFonts.forEach((element)=>{
        const elementAs = element.as;
        const elementType = element.type;
        const fontHref = element.getAttribute('href');
        if (fontHref) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = fontHref;
            link.as = elementAs;
            link.setAttribute('crossorigin', '');
            link.type = elementType;
            document.head.appendChild(link);
            element.remove()
        }
    }
    )
}
var dispatchedEventsLoadJs = !1;
var dispatchedElementor = !1;
function loadJs() {
    return new Promise((resolve)=>{
        function loadScript(element) {
            if (element.src && element.src.includes("paykickstart")) {
                return Promise.resolve()
            }
            if (element.src && element.src.includes("stripe")) {
                return Promise.resolve()
            }
            const elementID = element.id;
            const scriptSrc = element.getAttribute('src');
            const jsBefore = document.getElementById(elementID + '-before');
            const jsAfter = document.getElementById(elementID + '-after');
            const jsExtra = document.getElementById(elementID + '-extra');
            return new Promise((resolveScript)=>{
                function loadElement(scriptElement, id) {
                    if (!scriptElement) {
                        return Promise.resolve()
                    }
                    const newElement = createScript(scriptElement);
                    const scriptSrc = scriptElement.getAttribute('src');
                    return new Promise((resolveLoad,rejectLoad)=>{
                        newElement.onload = ()=>{
                            resolveLoad()
                        }
                        ;
                        newElement.onerror = ()=>{
                            console.error('Error loading script ' + scriptSrc);
                            rejectLoad(new Error('Error loading script ' + scriptSrc))
                        }
                        ;
                        if (!newElement.addEventListener && newElement.readyState) {
                            newElement.onreadystatechange = newElement.onload
                        }
                        document.head.appendChild(newElement);
                        if (!scriptSrc) {
                            resolveLoad()
                        }
                        scriptElement.remove()
                    }
                    )
                }
                var loadSequentially = ['i18n']
                if (scriptSrc && loadSequentially.some(part=>scriptSrc.includes(part))) {
                    loadElement(jsBefore, elementID + '-before').then(()=>loadElement(jsExtra, elementID + '-extra')).then(()=>loadElement(element, elementID)).then(()=>loadElement(jsAfter, elementID + '-after')).then(resolveScript).catch(error=>{
                        console.error('Script loading sequence failed:', error);
                        resolveScript()
                    }
                    )
                } else {
                    loadElement(jsBefore, elementID + '-before').then(()=>loadElement(jsExtra, elementID + '-extra')).then(()=>loadElement(element, elementID)).then(()=>loadElement(jsAfter, elementID + '-after')).then(resolveScript).catch(error=>{
                        console.error('Script loading sequence failed:', error);
                        resolveScript()
                    }
                    )
                }
            }
            )
        }
        function loadNextScript(index) {
            if (index >= allScripts.length) {
                loadLastScripts().then(()=>{
                    finalizeLoading();
                    resolve(!0)
                }
                ).catch(error=>{
                    console.error('Error loading last scripts:', error);
                    resolve(!1)
                }
                );
                return
            }
            const script = allScripts[index];
            loadScript(script).then(()=>loadNextScript(index + 1)).catch(error=>{
                console.error(error);
                resolve(!1)
            }
            )
        }
        function loadLastScripts() {
            return new Promise((resolve,reject)=>{
                let lastScripts = [].slice.call(document.querySelectorAll('script[type="wpc-delay-last-script"]')).filter(function(script) {
                    return !(/-before$|-after$|-extra$/).test(script.id)
                });
                if (lastScripts.length === 0) {
                    resolve()
                } else {
                    let lastScriptsPromises = lastScripts.map((script,index)=>loadScript(script));
                    Promise.all(lastScriptsPromises).then(resolve).catch(reject)
                }
            }
            )
        }
        function finalizeLoading() {
            if (typeof triggerDomEvent !== 'undefined' && triggerDomEvent !== "false") {
                window.dispatchEvent(new Event("DOMContentLoaded"));
                document.dispatchEvent(new Event("DOMContentLoaded"));
                window.dispatchEvent(new Event("resize"));
                window.dispatchEvent(new Event('load'));
                if (!hasBannerScript) {
                    document.dispatchEvent(new Event('load'))
                }
            }
            document.dispatchEvent(new Event('WPCContentLoaded'));
            if (typeof elementorFrontend !== 'undefined' && delayOn !== "false") {
                if (typeof triggerElementor === 'undefined' || (typeof triggerElementor !== 'undefined' && triggerElementor === 'true')) {
                    jQuery(document).ready(function() {
                        if (!jQuery('body').is('[data-elementor-device-mode]')) {
                            elementorFrontend.init()
                        } else {}
                    })
                }
            }
        }
        loadNextScript(0)
    }
    )
}
function createScript(sourceElement) {
    if (sourceElement !== null) {
        var newElement = document.createElement('script');
        newElement.setAttribute('type', 'text/javascript');
        newElement.setAttribute('data-loaded', 'createdScript');
        newElement.async = !1;
        for (var i = 0; i < sourceElement.attributes.length; i++) {
            var attr = sourceElement.attributes[i];
            if (attr.name !== 'type' && attr.name !== 'data-loaded' && attr.src !== 'data-loaded') {
                newElement.setAttribute(attr.name, attr.value)
            }
        }
        if (sourceElement !== null) {
            if (sourceElement.getAttribute('src') !== null) {
                newElement.setAttribute('src', sourceElement.getAttribute('src'))
            } else {
                newElement.textContent = sourceElement.textContent
            }
        }
        return newElement
    }
}
