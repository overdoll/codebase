/**
 * @generated SignedSource<<a9a620563a81c3f03021930a7e038e8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeDownPostContentButtonPostFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly id: string;
  readonly " $fragmentType": "ArrangeDownPostContentButtonPostFragment";
};
export type ArrangeDownPostContentButtonPostFragment$key = {
  readonly " $data"?: ArrangeDownPostContentButtonPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeDownPostContentButtonPostFragment">;
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
  "name": "ArrangeDownPostContentButtonPostFragment",
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

(node as any).hash = "0bb9b2f8ee6aed521dd67e3c4afadbdb";

export default node;
