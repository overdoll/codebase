/**
 * @generated SignedSource<<93af2ec997e4dc5e8a3cd53dfe4c0ded>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangePostContentButtonsPostFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeDownPostContentButtonPostFragment" | "ArrangeFirstPostContentButtonPostFragment" | "ArrangeLastPostContentButtonPostFragment" | "ArrangeUpPostContentButtonPostFragment">;
  readonly " $fragmentType": "ArrangePostContentButtonsPostFragment";
};
export type ArrangePostContentButtonsPostFragment$key = {
  readonly " $data"?: ArrangePostContentButtonsPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangePostContentButtonsPostFragment">;
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
  "name": "ArrangePostContentButtonsPostFragment",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeUpPostContentButtonPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeDownPostContentButtonPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeFirstPostContentButtonPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeLastPostContentButtonPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "76bc4f81432e15b410d87a734b2b9735";

export default node;
