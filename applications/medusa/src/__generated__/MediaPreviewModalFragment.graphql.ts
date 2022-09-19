/**
 * @generated SignedSource<<80a7f40feec7f02d84eb11dc33d535ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaPreviewModalFragment$data = {
  readonly media: {
    readonly " $fragmentSpreads": FragmentRefs<"RawCinematicMediaFragment">;
  };
  readonly " $fragmentType": "MediaPreviewModalFragment";
};
export type MediaPreviewModalFragment$key = {
  readonly " $data"?: MediaPreviewModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MediaPreviewModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MediaPreviewModalFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "media",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "RawCinematicMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "5a53deabc8c8441886cccb84d2ff1413";

export default node;
