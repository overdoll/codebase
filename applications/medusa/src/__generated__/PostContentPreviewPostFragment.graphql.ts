/**
 * @generated SignedSource<<9ac7ddf26356e66d970a00113bd24855>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewPostFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMenuPostFragment" | "RemovePostContentButtonPostFragment" | "SupporterPostContentButtonPostFragment">;
  readonly " $fragmentType": "PostContentPreviewPostFragment";
};
export type PostContentPreviewPostFragment$key = {
  readonly " $data"?: PostContentPreviewPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewPostFragment">;
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
  "name": "PostContentPreviewPostFragment",
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
      "name": "PostContentPreviewMenuPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePostContentButtonPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupporterPostContentButtonPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "f9b5105fe5bc8e0d3d5b77d82bec19cd";

export default node;
