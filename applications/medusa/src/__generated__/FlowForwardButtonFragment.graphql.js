/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { useUpdateAudienceFragment$ref } from "./useUpdateAudienceFragment.graphql";
import type { useUpdateBrandFragment$ref } from "./useUpdateBrandFragment.graphql";
import type { useUpdateContentFragment$ref } from "./useUpdateContentFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type FlowForwardButtonFragment$ref: FragmentReference;
declare export opaque type FlowForwardButtonFragment$fragmentType: FlowForwardButtonFragment$ref;
export type FlowForwardButtonFragment = {|
  +id: string,
  +content: $ReadOnlyArray<{|
    +id: string
  |}>,
  +audience: ?{|
    +id: string
  |},
  +brand: ?{|
    +id: string
  |},
  +$fragmentRefs: useUpdateContentFragment$ref & useUpdateAudienceFragment$ref & useUpdateBrandFragment$ref,
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
},
v1 = [
  (v0/*: any*/)
];
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
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateAudienceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateBrandFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '99603b08ad5f057fccf9beff45d7170c';
module.exports = node;
