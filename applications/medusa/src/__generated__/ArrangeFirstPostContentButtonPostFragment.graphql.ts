/**
 * @generated SignedSource<<455740ee60eb2855dccaf8bf90fb2748>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeFirstPostContentButtonPostFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly id: string;
  readonly " $fragmentType": "ArrangeFirstPostContentButtonPostFragment";
};
export type ArrangeFirstPostContentButtonPostFragment$key = {
  readonly " $data"?: ArrangeFirstPostContentButtonPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeFirstPostContentButtonPostFragment">;
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
  "name": "ArrangeFirstPostContentButtonPostFragment",
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

(node as any).hash = "86dd8c7e9697a081551da844001e4872";

export default node;
