/**
 * @generated SignedSource<<5b91b84a809fb4bea6b167b9e92c061b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VideoBackgroundFragment$data = {
  readonly videoThumbnail: {
    readonly url: string;
  } | null;
  readonly " $fragmentType": "VideoBackgroundFragment";
};
export type VideoBackgroundFragment$key = {
  readonly " $data"?: VideoBackgroundFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"VideoBackgroundFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VideoBackgroundFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "videoThumbnail",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "d45deccaf9bb2209e93fc1c7b9f683fe";

export default node;
