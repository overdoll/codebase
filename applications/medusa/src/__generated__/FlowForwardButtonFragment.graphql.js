/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type FlowForwardButtonFragment$ref: FragmentReference;
declare export opaque type FlowForwardButtonFragment$fragmentType: FlowForwardButtonFragment$ref;
export type FlowForwardButtonFragment = {|
  +id: string,
  +content: $ReadOnlyArray<{|
    +id: string
  |}>,
  +$refType: FlowForwardButtonFragment$ref,
|};
export type FlowForwardButtonFragment$data = FlowForwardButtonFragment;
export type FlowForwardButtonFragment$key = {
  +$data?: FlowForwardButtonFragment$data,
  +$fragmentRefs: FlowForwardButtonFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowForwardButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '9484d1c87f64a48aeb684b34fa10f62e';
module.exports = node;
