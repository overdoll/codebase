/**
 * @generated SignedSource<<487b39885c4d78091597f47f6d2c7da0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeUpPostContentButtonPostFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly id: string;
  readonly " $fragmentType": "ArrangeUpPostContentButtonPostFragment";
};
export type ArrangeUpPostContentButtonPostFragment$key = {
  readonly " $data"?: ArrangeUpPostContentButtonPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeUpPostContentButtonPostFragment">;
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
  "name": "ArrangeUpPostContentButtonPostFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
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

(node as any).hash = "3c605cf033d489ae7dc944e815465ac0";

export default node;
