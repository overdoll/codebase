/**
 * @generated SignedSource<<ebb1e8dce73aa411fd3b6a63dde4edc0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RemovePostContentButtonFragment$data = {
  readonly id: string;
  readonly resource: {
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
  readonly " $fragmentType": "RemovePostContentButtonFragment";
};
export type RemovePostContentButtonFragment$key = {
  readonly " $data"?: RemovePostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RemovePostContentButtonFragment">;
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
  "name": "RemovePostContentButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "resource",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceInfoFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};
})();

(node as any).hash = "60339da5c9fcef97fe4870d3d6f15ee1";

export default node;
