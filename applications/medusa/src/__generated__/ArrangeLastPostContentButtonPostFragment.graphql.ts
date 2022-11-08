/**
 * @generated SignedSource<<e787f8f4e1e5c893e4b853fa9a4de75f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeLastPostContentButtonPostFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly id: string;
  readonly " $fragmentType": "ArrangeLastPostContentButtonPostFragment";
};
export type ArrangeLastPostContentButtonPostFragment$key = {
  readonly " $data"?: ArrangeLastPostContentButtonPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeLastPostContentButtonPostFragment">;
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
  "name": "ArrangeLastPostContentButtonPostFragment",
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

(node as any).hash = "4c5be326dcd0c6cdb2267f518d215efb";

export default node;
