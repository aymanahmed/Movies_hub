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
      { data: { id: 'hmw', name: 'H.M Walker', weight:100, faveColor: '#000000', faveShape: 'roundrectangle' } },
      //war 827717
      { data: { id: 'sl', name: 'Stan Laurel', weight: 100, faveColor: '#827717', faveShape: 'roundrectangle' } },
      //drama 9C27B0
      { data: { id: 'oh', name: 'Oliver Hardy', weight: 100, faveColor: '#9C27B0', faveShape: 'roundrectangle' } },
      //romance FF1744
      { data: { id: 'wf', name: 'Warren Foster', weight: 100, faveColor: '#FF1744', faveShape: 'roundrectangle' } },
      //mystery CDDC39
      { data: { id: 'mb', name: 'Mel Blanc', weight: 100, faveColor: '#CDDC39', faveShape: 'roundrectangle' } },
      //biography 0288D1
      { data: { id: 'rc', name: 'Robert Clampett', weight: 100, faveColor: '#0288D1', faveShape: 'roundrectangle' } },
      //history 5D4037
      { data: { id: 'sh', name: 'Shemp Howard', weight: 100, faveColor: '#5D4037', faveShape: 'roundrectangle' } },
      //comedy FF6F00
      { data: { id: 'ch', name: 'Curly Howard', weight: 100, faveColor: '#FF6F00', faveShape: 'roundrectangle' } },
      //animation AD1457
      { data: { id: 'lf', name: 'Larry Fine', weight: 100, faveColor: '#AD1457', faveShape: 'roundrectangle' } },
      //short 78909c
      { data: { id: 'jw', name: 'Jules White', weight: 100, faveColor: '#78909c', faveShape: 'roundrectangle' } },
      //family ffc107
      { data: { id: 'mh', name: 'Moe Howard', weight: 100, faveColor: '#ffc107', faveShape: 'roundrectangle' } },
      //documentary 33691E
      { data: { id: 'fa', name: 'Felix Adler', weight: 100, faveColor: '#33691E', faveShape: 'roundrectangle' } },
      //action D50000
      { data: { id: 'hl', name: 'Harold Lloyd', weight: 100, faveColor: '#D50000', faveShape: 'roundrectangle' } },
      //musical 536DFE
      { data: { id: 'sp', name: 'Snub Pollard', weight: 100, faveColor: '#536DFE', faveShape: 'roundrectangle' } },
      { data: { id: 'bd', name: 'Bebe Daniels', weight: 100, faveColor: '#536DFE', faveShape: 'roundrectangle' } },
      { data: { id: 'lc', name: 'Lou Costello', weight: 100, faveColor: '#536DFE', faveShape: 'roundrectangle' } },
      { data: { id: 'ba', name: 'Bud Abbott', weight: 100, faveColor: '#536DFE', faveShape: 'roundrectangle' } },

      //Rules
      //family,short.animation B55F55
      { data: { id: 'hmw,oh.sl', name: '', weight: 13, faveColor: '#B55F55', faveShape: 'ellipse' } },
      //animation.short 93527A
      { data: { id: 'wf.mb', name: '', weight: 24, faveColor: '#93527A', faveShape: 'ellipse' } },
      //war.drama 8F4F64
      { data: { id: 'rc.mb', name: '', weight: 14, faveColor: '#8F4F64', faveShape: 'ellipse' } },
      //crime.drama 4E1458
      { data: { id: 'ch.lf', name: '', weight: 21, faveColor: '#4E1458', faveShape: 'ellipse' } },
      //animation,comedy.short A76964
      { data: { id: 'ch.mh', name: '', weight: 21, faveColor: '#A76964', faveShape: 'ellipse' } },
      //romance.drama CE1F7A
      { data: { id: 'lf.mh', name: '', weight: 44, faveColor: '#CE1F7A', faveShape: 'ellipse' } },     
      //crime,mystery.drama 824B67
      { data: { id: 'lc.ba', name: '', weight: 10, faveColor: '#824B67', faveShape: 'ellipse' } },
      //biography.drama 4F58C1
      { data: { id: 'sp,bd.hl', name: '', weight: 13, faveColor: '#4F58C1', faveShape: 'ellipse' } },
      //history.drama 7D3474
      { data: { id: 'jw,fa.mh', name: '', weight: 10, faveColor: '#7D3474', faveShape: 'ellipse' } },
      //musical.comedy A96E7F
      { data: { id: 'fa,jw.lf', name: '', weight: 10, faveColor: '#A96E7F', faveShape: 'ellipse' } },
      //mystery.drama B58275
      { data: { id: 'sh,jw.lf', name: '', weight: 12, faveColor: '#B58275', faveShape: 'ellipse' } },
      //biography.documentary 1B7978
      { data: { id: 'sh,jw.mh', name: '', weight: 28, faveColor: '#1B7978', faveShape: 'ellipse' } },
     

    ],
    edges: [
      //family,short=>animation
      { data: { source: 'hmw', target:'hmw,oh.sl', faveColor: '#DA902E', strength: 13 } },
      { data: { source: 'oh', target:'hmw,oh.sl', faveColor: '#977879', strength: 13 } },
      { data: { source: 'hmw,oh.sl', target:'sl', faveColor: '#B13A56', strength: 13 } },
      //animation=>short
      { data: { source: 'wf', target:'wf.mb', faveColor: '#A03369', strength: 24 } },
      { data: { source: 'wf.mb', target:'mb', faveColor: '#86718B', strength: 24 } },
      //war => drama
      { data: { source: 'rc', target:'rc.mb', faveColor: '#89633E', strength: 14 } },
      { data: { source: 'rc.mb', target:'mb', faveColor: '#963B8A', strength: 14 } },
      //crime => drama
      { data: { source: 'ch', target:'ch.lf', faveColor: '#270A2C', strength: 21 } },
      { data: { source: 'ch.lf', target:'lf', faveColor: '#751E84', strength: 21 } },
      { data: { source: 'ch', target:'ch.mh', faveColor: '#270A2C', strength: 21 } },
      { data: { source: 'ch.mh', target:'mh', faveColor: '#751E84', strength: 21 } },
      { data: { source: 'lf', target:'lf.mh', faveColor: '#270A2C', strength: 44 } },
      { data: { source: 'lf.mh', target:'mh', faveColor: '#751E84', strength: 44 } },
      { data: { source: 'lc', target:'lc.ba', faveColor: '#270A2C', strength: 10 } },
      { data: { source: 'lc.ba', target:'ba', faveColor: '#751E84', strength: 10 } },
      //family,short=>animation
      { data: { source: 'sp', target:'sp,bd.hl', faveColor: '#DA902E', strength: 13 } },
      { data: { source: 'bd', target:'sp,bd.hl', faveColor: '#977879', strength: 13 } },
      { data: { source: 'sp,bd.hl', target:'hl', faveColor: '#B13A56', strength: 13 } },
     //family,short=>animation
      { data: { source: 'jw', target:'jw,fa.mh', faveColor: '#DA902E', strength: 10 } },
      { data: { source: 'fa', target:'jw,fa.mh', faveColor: '#977879', strength: 10 } },
      { data: { source: 'jw,fa.mh', target:'mh', faveColor: '#B13A56', strength: 10 } },
      //family,short=>animation
      { data: { source: 'fa', target:'fa,jw.lf', faveColor: '#DA902E', strength: 10 } },
      { data: { source: 'jw', target:'fa,jw.lf', faveColor: '#977879', strength: 10 } },
      { data: { source: 'fa,jw.lf', target:'lf', faveColor: '#B13A56', strength: 10 } },
      //family,short=>animation
      { data: { source: 'sh', target:'sh,jw.lf', faveColor: '#DA902E', strength: 12 } },
      { data: { source: 'jw', target:'sh,jw.lf', faveColor: '#977879', strength: 12 } },
      { data: { source: 'sh,jw.lf', target:'lf', faveColor: '#B13A56', strength: 12 } },
     //family,short=>animation
      { data: { source: 'sh', target:'sh,jw.mh', faveColor: '#DA902E', strength: 28 } },
      { data: { source: 'jw', target:'sh,jw.mh', faveColor: '#977879', strength: 28 } },
      { data: { source: 'sh,jw.mh', target:'mh', faveColor: '#B13A56', strength: 28 } },
    ]
  },
  
  ready: function(){
    window.cy = this;
    
    // giddy up
  }
});

}); // on dom ready