/**
 * @generated SignedSource<<320b6c1d4958b234bfcf38ea3ef14323>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RenderVideoFragment$data = {
  readonly urls: ReadonlyArray<{
    readonly url: string;
    readonly mimeType: string;
  }>;
  readonly videoThumbnail: {
    readonly url: string;
  } | null;
  readonly width: number;
  readonly height: number;
  readonly " $fragmentType": "RenderVideoFragment";
};
export type RenderVideoFragment = RenderVideoFragment$data;
export type RenderVideoFragment$key = {
  readonly " $data"?: RenderVideoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RenderVideoFragment">;
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
  "name": "RenderVideoFragment",
  "selections": [
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "width",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "height",
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};
})();

(node as any).hash = "cf3d76674ab16f5df588b1296b5c1337";

export default node;
