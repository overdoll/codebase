/**
 * @generated SignedSource<<b920db1d126a9ac0ca4809a6b2ffc896>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceThumbnailFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeAudienceThumbnailFormFragment";
};
export type ChangeAudienceThumbnailFormFragment$key = {
  readonly " $data"?: ChangeAudienceThumbnailFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceThumbnailFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceThumbnailFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "fe898a9ff9de9b1096ed2e84f123cddf";

export default node;
