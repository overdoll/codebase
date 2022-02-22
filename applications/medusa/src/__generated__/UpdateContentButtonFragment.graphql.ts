/**
 * @generated SignedSource<<83b665abeee9c87b576861d3299515c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateContentButtonFragment$data = {
  readonly id: string;
  readonly content: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly " $fragmentType": "UpdateContentButtonFragment";
};
export type UpdateContentButtonFragment = UpdateContentButtonFragment$data;
export type UpdateContentButtonFragment$key = {
  readonly " $data"?: UpdateContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateContentButtonFragment">;
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
  "name": "UpdateContentButtonFragment",
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

(node as any).hash = "bd3c18f89bc80017d72e0511fcb9ef6b";

export default node;
