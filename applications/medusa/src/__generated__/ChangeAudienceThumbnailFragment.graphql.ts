/**
 * @generated SignedSource<<1b30389dd6cbfe328cdc3949c3b54f75>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceThumbnailFragment$data = {
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeAudienceThumbnailFragment";
};
export type ChangeAudienceThumbnailFragment = ChangeAudienceThumbnailFragment$data;
export type ChangeAudienceThumbnailFragment$key = {
  readonly " $data"?: ChangeAudienceThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceThumbnailFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeAudienceThumbnailFormFragment"
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "25a32516f5fb80e6120801acada3d6c7";

export default node;
