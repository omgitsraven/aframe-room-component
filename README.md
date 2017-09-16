## aframe-room-component

[![Version](http://img.shields.io/npm/v/aframe-room-component.svg?style=flat-square)](https://npmjs.org/package/aframe-room-component)
[![License](http://img.shields.io/npm/l/aframe-room-component.svg?style=flat-square)](https://npmjs.org/package/aframe-room-component)

A set of [A-Frame](https://aframe.io) components for quickly creating rooms connected by doors.

[Click here to see an example](https://omgitsraven.github.io/aframe-room-component/examples/basic/)

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-room-component/dist/aframe-room-component.min.js"></script>
</head>

<body>
	<a-scene>
		<rw-room position="-2 0 -2" material="color:#866">
			<rw-wall position="4 0 0"></rw-wall>
			<rw-wall position="4 0 4"></rw-wall>
			<rw-wall position="0 0 4"></rw-wall>
			<rw-wall position="0 0 0">
		  		<rw-doorhole id="holeA"></rw-doorhole>
		  		<rw-doorlink from="#holeA" to="#holeB" position="2.5 0 0"></rw-doorlink>
			</rw-wall>
		</rw-room>
		<rw-room position="0 0 -3">
			<rw-wall position=" 1 0 -1" material="color:#787"></rw-wall>
			<rw-wall position=" 1 0  1" material="color:#877">
				<rw-doorhole id="holeB"></rw-doorhole>
			</rw-wall>
			<rw-wall position="-1 0  1" material="color:#878"></rw-wall>
			<rw-wall position="-1 0 -1" material="color:#778"></rw-wall>
		</rw-room>
	</a-scene>
</body>
```

<!-- If component is accepted to the Registry, uncomment this. -->
<!--
Or with [angle](https://npmjs.com/package/angle/), you can install the proper
version of the component straight into your HTML file, respective to your
version of A-Frame:
```sh
angle install aframe-room-component
```
-->

#### npm

Install via npm:

```bash
npm install aframe-room-component
```

Then require and use.

```js
require('aframe');
require('aframe-room-component');
```

### Usage

#### Overview

This is set of primitives (also usable as components) that can be used to easily lay out rooms connected by doors in A-Frame. Here is an overview of their usage. (Attributes in *italics* are redundant shorthands; see below.)

| Primitive   | Component | Purpose | Attributes &amp; Components |
| - | - | - | - |
| rw-room     | room      | Contains a set of walls, and other objects. | position, outside, *material, height, width, length* |
| rw-wall     | wall      | Marks one corner of a wall, which will connect to the next. | position, material, height |
| rw-doorhole | doorhole  | Marks a wall so that a doorlink can connect to it. | (none) |
| rw-doorlink | doorlink  | Connects two doorholes, as well as positioning them as close to it as possible. | from, to, position, width, height |
| rw-floor, rw-ceiling, rw-sides | floor, ceiling, sides | Used to assign materials to the floor and ceiling of rooms and doorlinks, and to the sides of doorlinks. | material |

#### Hierarchy

An `a-scene` can contain multiple `rw-room`s.

An `rw-room` must contain at least three `rw-wall`s. You can add `outside="true"` to the room if you want its walls to describe the outside of a building rather than the interior of a room.

An `rw-wall` can have any a-frame entity as a child. `rw-wall`s are oriented so that their `x` direction always points toward the next wall; i.e., when an object is parented to an `rw-wall`, its `x` coordinate controls how far along the wall it is, its `y` coordinate controls how high off the ground it is, and its `z` coordinate controls how distant from the wall it is.

An `rw-doorhole` must be the child of an `rw-wall`. It is used to indicate on which wall a door connection should exist. An `rw-doorhole` can also have any a-frame entity as a child (for example, a model of a literal door). Note: do **not** apply a `position` to an `rw-doorhole`! Their position will be assigned by the `rw-doorlink` they are linked to.

An `rw-doorlink` can be a child of an `a-scene` (i.e. outside of a room), or a child of an `rw-wall`. (It **cannot** be the child of an `rw-doorhole`!) Its position is used to automatically set the position of the two `rw-doorhole`s that it is connected to: they will be moved as close as possible to it on their walls. This allows doorways to always automatically be directly connected by the shortest distance (rather than forcing you to manually position both of the doorholes to line up). Choosing whether to parent the `rw-doorlink` to the scene or to one of the two walls that it's connecting is up to you, depending on the building layout you're creating. (It may be simpler to make adjustments a room depending on whether or not the door moves with it or tries to stay in place.)

An `rw-floor` and an `rw-ceiling` must be the child of either an `rw-room` or an `rw-doorlink`. They exist as a place to attach the material you wish to have applied to the floor or ceiling of the room (or doorlink). An `rw-sides` is similar, but is only used in doorlinks. You can omit them if you wish (i.e. if you would rather manually create a single floorplane for your entire building instead).

#### Shorthands

If an `rw-wall` does not have a `material` component, it will use its parent `rw-room`'s material component. (A material component **must** be supplied on either the `rw-wall` or the `rw-room`.) The same goes for `rw-floor`, `rw-ceiling` and `rw-sides` (and their parent `rw-doorlink` or `rw-room`).

Similarly, if an `rw-wall` does not have a `height` attribute, it will use its parent `rw-room`'s height attribute. (If neither has a height attribute, a default height of 2.4m will be used.)

If an `rw-room` has a `width` attribute **and** a `length` attribute, and four `rw-wall`s inside, the `position`s can be ommitted from the walls; they will be set automatically, to form a rectangle with one corner at `0,0` and the opposite corner at `width,length`. (This is just to save typing in the relatively common case of rectangular, axis-aligned rooms.)



### Notes

#### Tips

Have a look at the source to [this example](https://omgitsraven.github.io/aframe-room-component/examples/basic/) to see some ways that this system can be used.

You may find it helpful to use a mixin for a commonly-occuring material (such as a floor material).

If you want to make a door to the outside world, make an `rw-room` around your other rooms, with `outside="true"` on it, and put the other doorhole on one of its walls.

These primitives should all correctly respect changes made in the Inspector; however, at the moment, there seems to be a bug where changes are only propagated to the objects a few times a second. If you have made changes in the inspector but things look like they aren't fitting right, make a minor change to one of the numerical properties to force everything to update.



#### Planned features

- Greater control over UV generation (world space, scale to surface, etc)
- Automatically assign collision for movement and teleportation systems
- Create doors above ground level (i.e. windows)
- Specify shapes to be extruded to automatically create doorframes and baseboards

#### Known issues

Room corners (i.e. `rw-wall`s) can be specified in either clockwise or counterclockwise order; however, they will be rearranged internally to always wind clockwise, so you may find that the x axis is pointing to the previous wall rather than the next wall if you list them in counterclockwise order. (This doesn't hurt anything; it's just something to be aware of in case you're confused why it's happening.) This will also happen if you copy a room but set it to `outside`.

Walls can have non-zero `y` coordinates, which for the most part should be handled gracefully — however, there is no simple way to offer control over the triangulation of the ceiling and floor, so rooms whose wall slopes aren't constant may have unpredictable floor and ceiling shapes.

In general, this system is still **very early**, so it contains very little error reporting or sanity checks, and generally has not yet been thoroughly tested, so use with caution, and let me know what issues you run into.

### In closing

I hope this lets you express your ideas in virtual reality more easily! Creating wall with doors has always been one of the most frustratingly time-consuming steps in sketching out a basic building, for me; so hopefully this will allow more people to create and share the fictional spaces of their dreams, or re-creations of real places they wish more people could see! Please do let me know if this has helped you to create something; I'd love to see it.