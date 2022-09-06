/**
 * @generated SignedSource<<b90403f3f07c147d9079bb236bc4c95c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useVideoControlsFragment$data = {
  readonly id: string;
  readonly urls: ReadonlyArray<{
    readonly mimeType: string;
    readonly url: string;
  }>;
  readonly videoThumbnail: {
    readonly url: string;
  } | null;
  readonly " $fragmentType": "useVideoControlsFragment";
};
export type useVideoControlsFragment$key = {
  readonly " $data"?: useVideoControlsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useVideoControlsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useVideoControlsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "urls",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "mimeType",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "videoThumbnail",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};
})();

(node as any).hash = "3071f0dd9e101467af7f8b69533b155b";

export default node;
