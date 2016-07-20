$(function(){ // on dom ready

$('#cy').cytoscape({
  layout: {
    name: 'cose',
    padding: 10
  },
  
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'shape': 'data(faveShape)',
        'width': 'mapData(weight, 40, 80, 20, 60)',
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': 'data(faveColor)',
        'background-color': 'data(faveColor)',
        'color': '#fff'
      })
    .selector(':selected')
      .css({
        'border-width': 3,
        'border-color': '#333'
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
        'opacity': 0.666,
        'width': 'mapData(strength, 70, 100, 2, 6)',
        'target-arrow-shape': 'triangle',
        'source-arrow-shape': 'circle',
        'line-color': 'data(faveColor)',
        'source-arrow-color': 'data(faveColor)',
        'target-arrow-color': 'data(faveColor)'
      })
    .selector('edge.questionable')
      .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
      })
    .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }),
  minZoom: 1e-1,
  maxZoom: 1e1,
  elements: {
    nodes: [
      //Genres
      //crime 000000
      { data: { id: 'crime', name: 'Crime', weight:100, faveColor: '#000000', faveShape: 'roundrectangle' } },
      //war 827717
      { data: { id: 'war', name: 'War', weight: 100, faveColor: '#827717', faveShape: 'roundrectangle' } },
      //drama 9C27B0
      { data: { id: 'drama', name: 'Drama', weight: 100, faveColor: '#9C27B0', faveShape: 'roundrectangle' } },
      //romance FF1744
      { data: { id: 'romance', name: 'Romance', weight: 100, faveColor: '#FF1744', faveShape: 'roundrectangle' } },
      //mystery CDDC39
      { data: { id: 'mystery', name: 'Mystery', weight: 100, faveColor: '#CDDC39', faveShape: 'roundrectangle' } },
      //biography 0288D1
      { data: { id: 'biography', name: 'Biography', weight: 100, faveColor: '#0288D1', faveShape: 'roundrectangle' } },
      //history 5D4037
      { data: { id: 'history', name: 'History', weight: 100, faveColor: '#5D4037', faveShape: 'roundrectangle' } },
      //comedy FF6F00
      { data: { id: 'comedy', name: 'Comedy', weight: 100, faveColor: '#FF6F00', faveShape: 'roundrectangle' } },
      //animation AD1457
      { data: { id: 'animation', name: 'Animation', weight: 100, faveColor: '#AD1457', faveShape: 'roundrectangle' } },
      //short 78909c
      { data: { id: 'short', name: 'Short', weight: 100, faveColor: '#78909c', faveShape: 'roundrectangle' } },
      //family ffc107
      { data: { id: 'family', name: 'Family', weight: 100, faveColor: '#ffc107', faveShape: 'roundrectangle' } },
      //documentary 33691E
      { data: { id: 'documentary', name: 'Documentary', weight: 100, faveColor: '#33691E', faveShape: 'roundrectangle' } },
      //action D50000
      { data: { id: 'action', name: 'Action', weight: 100, faveColor: '#D50000', faveShape: 'roundrectangle' } },
      //musical 536DFE
      { data: { id: 'musical', name: 'Musical', weight: 100, faveColor: '#536DFE', faveShape: 'roundrectangle' } },

      //Rules
      //family,short.animation B55F55
      { data: { id: 'family,short.animation', name: '', weight: 20, faveColor: '#B55F55', faveShape: 'ellipse' } },
      //animation.short 93527A
      { data: { id: 'animation.short', name: '', weight: 92, faveColor: '#93527A', faveShape: 'ellipse' } },
      //war.drama 8F4F64
      { data: { id: 'war.drama', name: '', weight: 24, faveColor: '#8F4F64', faveShape: 'ellipse' } },
      //crime.drama 4E1458
      { data: { id: 'crime.drama', name: '', weight: 96, faveColor: '#4E1458', faveShape: 'ellipse' } },
      //animation,comedy.short A76964
      { data: { id: 'animation,comedy.short', name: '', weight: 26, faveColor: '#A76964', faveShape: 'ellipse' } },
      //romance.drama CE1F7A
      { data: { id: 'romance.drama', name: '', weight: 114, faveColor: '#CE1F7A', faveShape: 'ellipse' } },     
      //crime,mystery.drama 824B67
      { data: { id: 'crime,mystery.drama', name: '', weight: 10, faveColor: '#824B67', faveShape: 'ellipse' } },
      //biography.drama 4F58C1
      { data: { id: 'biography.drama', name: '', weight: 32, faveColor: '#4F58C1', faveShape: 'ellipse' } },
      //history.drama 7D3474
      { data: { id: 'history.drama', name: '', weight: 24, faveColor: '#7D3474', faveShape: 'ellipse' } },
      //musical.comedy A96E7F
      { data: { id: 'musical.comedy', name: '', weight: 22, faveColor: '#A96E7F', faveShape: 'ellipse' } },
      //mystery.drama B58275
      { data: { id: 'mystery.drama', name: '', weight: 34, faveColor: '#B58275', faveShape: 'ellipse' } },
      //biography.documentary 1B7978
      { data: { id: 'biography.documentary', name: '', weight: 28, faveColor: '#1B7978', faveShape: 'ellipse' } },
      //romance.comedy FF4322
      { data: { id: 'romance.comedy', name: '', weight: 84, faveColor: '#FF4322', faveShape: 'ellipse' } },
      //action,crime.drama 841458
      { data: { id: 'action,crime.drama', name: '', weight: 18, faveColor: '#841458', faveShape: 'ellipse' } },
      

    ],
    edges: [
      //family,short=>animation
      { data: { source: 'family', target:'family,short.animation', faveColor: '#DA902E', strength: 20 } },
      { data: { source: 'short', target:'family,short.animation', faveColor: '#977879', strength: 20 } },
      { data: { source: 'family,short.animation', target:'animation', faveColor: '#B13A56', strength: 20 } },
      //animation=>short
      { data: { source: 'animation', target:'animation.short', faveColor: '#A03369', strength: 92 } },
      { data: { source: 'animation.short', target:'short', faveColor: '#86718B', strength: 92 } },
      //war => drama
      { data: { source: 'war', target:'war.drama', faveColor: '#89633E', strength: 24 } },
      { data: { source: 'war.drama', target:'drama', faveColor: '#963B8A', strength: 24 } },
      //crime => drama
      { data: { source: 'crime', target:'crime.drama', faveColor: '#270A2C', strength: 96 } },
      { data: { source: 'crime.drama', target:'drama', faveColor: '#751E84', strength: 96 } },
      //animation,comedy=>short
      { data: { source: 'animation', target:'animation,comedy.short', faveColor: '#AA3F5E', strength: 26 } },
      { data: { source: 'comedy', target:'animation,comedy.short', faveColor: '#D36C32', strength: 26 } },
      { data: { source: 'animation,comedy.short', target:'short', faveColor: '#907D80', strength: 26 } },
      //romance => drama
      { data: { source: 'romance', target:'romance.drama', faveColor: '#E71B5F', strength: 114 } },
      { data: { source: 'romance.drama', target:'drama', faveColor: '#B52395', strength: 114 } },
      //crime,mystery=>drama
      { data: { source: 'crime', target:'crime,mystery.drama', faveColor: '#412634', strength: 10 } },
      { data: { source: 'mystery', target:'crime,mystery.drama', faveColor: '#A89450', strength: 10 } },
      { data: { source: 'crime,mystery.drama', target:'drama', faveColor: '#8F398C', strength: 10 } },
      //biography=>drama
      { data: { source: 'biography', target:'biography.drama', faveColor: '#2970C9', strength: 32 } },
      { data: { source: 'biography.drama', target:'drama', faveColor: '#7640B9', strength: 32 } },
      //history=>drama
      { data: { source: 'history', target:'history.drama', faveColor: '#6D3A56', strength: 24 } },
      { data: { source: 'history.drama', target:'drama', faveColor: '#8D2E92', strength: 24 } },
      //musical=>comedy
      { data: { source: 'musical', target:'musical.comedy', faveColor: '#7E6EBF', strength: 22 } },
      { data: { source: 'musical.comedy', target:'comedy', faveColor: '#D46F40', strength: 22 } },
      //mystery=>drama
      { data: { source: 'mystery', target:'mystery.drama', faveColor: '#C1AF57', strength: 34 } },
      { data: { source: 'mystery.drama', target:'drama', faveColor: '#A95593', strength: 34 } }, 
      //biography=>documentary
      { data: { source: 'biography', target:'biography.documentary', faveColor: '#0F81A5', strength: 28 } },
      { data: { source: 'biography.documentary', target:'documentary', faveColor: '#27714B', strength: 28 } },
      //romance=>comedy
      { data: { source: 'romance', target:'romance.comedy', faveColor: '#FF2D33', strength: 84 } },
      { data: { source: 'romance.comedy', target:'comedy', faveColor: '#FF5911', strength: 84 } },
      //action,crime=>drama
      { data: { source: 'action', target:'action,crime.drama', faveColor: '#AD0A2C', strength: 18 } },
      { data: { source: 'crime', target:'action,crime.drama', faveColor: '#420A2C', strength: 18 } },
      { data: { source: 'action,crime.drama', target:'drama', faveColor: '#901E84', strength: 18 } },
    ]
  },
  
  ready: function(){
    window.cy = this;
    
    // giddy up
  }
});

}); // on dom ready