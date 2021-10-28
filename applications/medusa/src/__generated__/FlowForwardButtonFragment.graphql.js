/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { useUpdateAudienceFragment$ref } from "./useUpdateAudienceFragment.graphql";
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
  +$fragmentRefs: useUpdateContentFragment$ref & useUpdateAudienceFragment$ref,
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUpdateAudienceFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '457fbfec029b2b8ae40a7a03ce837d4c';
module.exports = node;
